const JWT = require('jsonwebtoken');

module.exports = (body) => {

  if (!body) {
    return new Error('invalid jwtdata');
  }

  return JWT.verify(body.toString('utf8'), "LqOIWmdQTSfhraa5UZhLazTMLR3ph7Y_-VcEs-oLnYOZSGpxV9opR8DE-XRzCN8-Cy3HoMZJSCTt4ftlSSJPnjM8kF1XFX8_Q_dkgfx_N920dzsLLuER2c3s-78ejhc6vb6NEWOEINXRk5iMhl8-Wd5Vak3fAfN1WIL_klqAs4icmM6KuUr74NVjiC_mYwatmyPMuo8bzc1vOGmE_EZx_fGv13UAj7NrO6AXyrlvvNrObCslBMKSbEozZs1WCQ2", {
    algorithm: 'HS256',
  });
};
