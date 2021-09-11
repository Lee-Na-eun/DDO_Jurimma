const { content, word } = require('../../models');
const {
  generateAccessToken,
  isAuthorized,
} = require('../tokenFunction/accessToken');
const { refreshAuthorized } = require('../tokenFunction/refreshToken');

module.exports = {
  patch: async (req, res) => {
    const accessTokenCheck = isAuthorized(req);
    const refreshTokenCheck = refreshAuthorized(req);

    if (accessTokenCheck) {
      // accessToken이 만료되지 않았을 경우,
      // => 바로 요청에 대한 응답 제공
      const { contentId, wordMean } = req.body;
      const oldContent = await content.findOne({
        where: { id: contentId },
      });
      oldContent.wordMean = wordMean;
      await oldContent.save();
      const allMyContents = await content.findAll({
        where: { userId: accessTokenCheck.id },
      });
      const returnData = allMyContents.map(async (el) => {
        el.wordName = await word.findOne({
          where: { id: el.wordId },
        }).wordName;
        return el;
      });
      res.status(200).json({ data: returnData });
    } else {
      // accessToken이 만료되어서 refreshToken을 판별하고,
      // refreshToken은 만료되지 않았을 경우,
      // => 요청에 대한 응답과 함께 새로 만든 accessToken 발급
      if (refreshTokenCheck) {
        delete refreshTokenCheck.exp;
        const accessToken = generateAccessToken(refreshTokenCheck);

        const { contentId, wordMean } = req.body;
        const oldContent = await content.findOne({
          where: { id: contentId },
        });
        oldContent.wordMean = wordMean;
        await oldContent.save();
        const allMyContents = await content.findAll({
          where: { userId: refreshTokenCheck.id },
        });
        const returnData = allMyContents.map(async (el) => {
          el.wordName = await word.findOne({
            where: { id: el.wordId },
          }).wordName;
          return el;
        });
        res.status(201).json({
          accessToken: accessToken,
          data: returnData,
        });
      } else {
        // accessToken이 만료되어서 refreshToken을 판별하고,
        // refreshToken도 만료되었을 경우,
        // 클라이언트에게 다시 로그인을 하라는 메시지 응답을 보낸다.
        res.status(401).json({ message: 'Send new Login Request' });
      }
    }
  },
};
