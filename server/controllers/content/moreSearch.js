const { content, word, user_contents } = require('../../models');
const {
  generateAccessToken,
  isAuthorized,
} = require('../tokenFunction/accessToken');
const { refreshAuthorized } = require('../tokenFunction/refreshToken');

module.exports = {
  get: async (req, res) => {
    const accessTokenCheck = isAuthorized(req);
    const refreshTokenCheck = refreshAuthorized(req);

    if (accessTokenCheck) {
      // accessToken이 만료되지 않았을 경우,
      // => 바로 요청에 대한 응답 제공
      try {
        const { wordName } = req.query;
        const coWordName = await word.findOne({
          where: { wordName: wordName },
        });
        const coContents = await content.findAll({
          where: { wordId: coWordName.id },
        });
        coContents.sort((a, b) => b.thumbsup - a.thumbsup);
        const returnData = coContents.map((el) => {
          el.dataValues.wordName = wordName;
          return el;
        });

        const onlyContentId = coContents.map((el) => el.id);
        const allUserContents = await user_contents.findAll();
        const thumbsupData = {};
        for (let i = 0; i < allUserContents.length; i++) {
          if (onlyContentId.includes(allUserContents[i].content_Id)) {
            if (!(allUserContents[i].content_Id in thumbsupData)) {
              thumbsupData[allUserContents[i].content_Id] = [
                allUserContents[i].user_Id,
              ];
            } else {
              thumbsupData[allUserContents[i].content_Id].push(
                allUserContents[i].user_Id
              );
            }
          }
        }
        res.status(200).json({
          data: returnData,
          thumbsupData: thumbsupData,
        });
      } catch (err) {
        console.log(err);
        res.status(404).json({ message: 'Not Found!' });
      }
    } else {
      if (refreshTokenCheck) {
        // accessToken이 만료되어서 refreshToken을 판별하고,
        // refreshToken은 만료되지 않았을 경우,
        // => 요청에 대한 응답과 함께 새로 만든 accessToken 발급
        delete refreshTokenCheck.exp;
        const accessToken = generateAccessToken(refreshTokenCheck);

        try {
          const { wordName } = req.query;
          const coWordName = await word.findOne({
            where: { wordName: wordName },
          });
          const coContents = await content.findAll({
            where: { wordId: coWordName.id },
          });
          coContents.sort((a, b) => b.thumbsup - a.thumbsup);
          const returnData = coContents.map((el) => {
            el.dataValues.wordName = wordName;
            return el;
          });

          const onlyContentId = coContents.map((el) => el.id);
          const allUserContents = await user_contents.findAll();
          const thumbsupData = {};
          for (let i = 0; i < allUserContents.length; i++) {
            if (onlyContentId.includes(allUserContents[i].content_Id)) {
              if (!(allUserContents[i].content_Id in thumbsupData)) {
                thumbsupData[allUserContents[i].content_Id] = [
                  allUserContents[i].user_Id,
                ];
              } else {
                thumbsupData[allUserContents[i].content_Id].push(
                  allUserContents[i].user_Id
                );
              }
            }
          }
          res.status(201).json({
            accessToken: accessToken,
            data: returnData,
            thumbsupData: thumbsupData,
          });
        } catch (err) {
          console.log(err);
          res.status(404).json({ message: 'Not Found!' });
        }
      } else {
        // accessToken이 만료되어서 refreshToken을 판별하고,
        // refreshToken도 만료되었을 경우,
        // 클라이언트에게 다시 로그인을 하라는 메시지 응답을 보낸다.
        res.status(401).json({ message: 'Send new Login Request' });
      }
    }
  },
};
