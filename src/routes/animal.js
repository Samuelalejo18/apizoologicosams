const express = require("express");
const router = express.Router(); //manejador de rutas de express
const animalSchema = require("../models/animal");
//Nuevo animal
router.post("/animalsPost", (req, res) => {
    const animal = animalSchema(req.body);
    animal
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.get("/getAnimals", async (req, res) => {

    try {
        const animals = await animalSchema.find();
        res.json(animals);
    } catch (error) {
        res.json({ message: error.message })
    }
})

router.get("/getAnimalsById/:id", async (req, res) => {

    try {
        const { id } = req.params;
        const animals = await animalSchema.findById();
        res.json(animals);
    } catch (error) {
        res.json({ message: error.message })
    }
})



router.delete("/deleteAnimals/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const animalDelete = await animalSchema.findByIdAndDelete(id);
        if (!animalDelete) {
            return res.status(404).json("El animal no existe")
        }
        res.status(200).json({ message: "Animal eliminado correctamente" });
    } catch (error) {
        res.json({ message: error.message })
    }
})

router.put("/putAnimals/:id", async (req, res) => {
    try {

        const { id } = req.params;
        const animalPut = await animalSchema.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );
        res.json({
            message: "Usuario actualizado con éxito",
        });
    } catch (error) {
        res.json({ message: error.message })
    }

})
module.exports = router;
