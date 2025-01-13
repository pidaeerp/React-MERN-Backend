/*
    Event Router de Usuarios / CRUD
    host + /api/events
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { isDate } = require("../helpers/isDate");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getEventos,
  crearEventos,
  actualizarEventos,
  eliminarEventos,
} = require("../controllers/events");

const router = Router();

//Todas tienen que pasar por la validación de JWT
router.use(validarJWT);

//Obtener eventos
router.get("/", getEventos);

//Crear eventos
router.post(
  "/",
  [
    check("title", "El título es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalización es obligatoria").custom(isDate),
    validarCampos,
  ],
  crearEventos
);

//Actualizar eventos
router.put(
  "/:id",
  [
    check("title", "El título es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalización es obligatoria").custom(isDate),
    validarCampos,
  ],
  actualizarEventos
);

//Eliminar eventos
router.delete("/:id", eliminarEventos);

module.exports = router;
