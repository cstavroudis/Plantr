const router = require("express").Router();
const { Plant, Type } = require("../db/models");
const { Op } = require("sequelize");
const adminsOnly = require("../utils/adminsOnly");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const plants = await Plant.findAll({
      include: Type,
    });
    res.json(plants);
  } catch (e) {
    next(e);
  }
});

// GET api/plants/page/:pageNum
router.get("/page/:pageNum", async (req, res, next) => {
  try {
    let pageNum = req.params.pageNum || 0;
    let filters = req.query.filters;
    if (filters && filters.length === 1) filters = [Number(req.query.filters)];
    if (filters && filters.length > 1)
      filters = filters.split(",").map((id) => Number(id));

    let plants;
    if (filters) {
      plants = await Plant.findAll({
        limit: 12,
        offset: 12 * pageNum,
        include: Type,
        where: {
          typeId: {
            [Op.or]: filters,
          },
        },
      });
    } else {
      plants = await Plant.findAll({
        limit: 12,
        offset: 12 * pageNum,
        include: Type,
      });
    }
    res.json(plants);
  } catch (e) {
    next(e);
    console.log("there was an error in GET api/plants/page/:pageNum");
  }
});

// GET api/plants/types
router.get("/types", async (req, res, next) => {
  try {
    const types = await Type.findAll({
      order: [["name", "ASC"]],
    });
    res.json(types);
  } catch (error) {
    next(error);
    console.log("there was an error in GET api/types");
  }
});

//GET api/plants/types/:id
router.get(`/types/:id`, async (req, res, next) => {
  try {
    const id = +req.params.id;
    const type = await Type.findOne({
      where: {
        id: id,
      },
      include: Plant,
    });
    res.json(type);
  } catch (error) {
    next(error);
    console.log("there was an error in GET api/plants/types/:id");
  }
});

// GET api/plants/:id
router.get("/:id", async (req, res, next) => {
  try {
    const plant = await Plant.findByPk(req.params.id, { include: Type });
    res.json(plant);
  } catch (e) {
    next(e);
  }
});

// POST /api/plants
router.post("/", adminsOnly, async (req, res, next) => {
  try {
    const newPlant = await Plant.ceate(req.body);
    res.status(201).send(newPlant);
  } catch (e) {
    next(e);
  }
});

// PUT /api/plants/:id
router.put("/:id", adminsOnly, async (req, res, next) => {
  try {
    const singlePlant = await Plant.findByPk(Number(req.params.id), {
      include: Type,
    });
    res.send(await singlePlant.update(req.body));
  } catch (e) {
    next(e);
  }
});

// DELETE /api/plants/:id
router.delete("/:id", adminsOnly, async (req, res, next) => {
  try {
    const singlePlant = await Plant.findByPk(Number(req.params.id));
    await singlePlant.destroy();
    res.send(singlePlant);
  } catch (e) {
    next(e);
  }
});
