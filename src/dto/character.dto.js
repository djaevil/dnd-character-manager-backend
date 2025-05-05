const Joi = require("joi");

const characterDTO = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  race: Joi.string().allow("").optional(),
  class: Joi.string().allow("").optional(),
  level: Joi.number().integer().min(1).required(),
  healthPoints: Joi.number().integer().min(0).max(1000).optional(),
  background: Joi.string().allow("").optional(),

  stats: Joi.object({
    strength: Joi.number().integer().min(0).max(40),
    dexterity: Joi.number().integer().min(0).max(40),
    constitution: Joi.number().integer().min(0).max(40),
    intelligence: Joi.number().integer().min(0).max(40),
    wisdom: Joi.number().integer().min(0).max(40),
    charisma: Joi.number().integer().min(0).max(40),
  }).optional(),

  skills: Joi.object({
    acrobatics: Joi.number().integer().min(-20).max(20),
    animalHandling: Joi.number().integer().min(-20).max(20),
    arcana: Joi.number().integer().min(-20).max(20),
    athletics: Joi.number().integer().min(-20).max(20),
    deception: Joi.number().integer().min(-20).max(20),
    history: Joi.number().integer().min(-20).max(20),
    insight: Joi.number().integer().min(-20).max(20),
    intimidation: Joi.number().integer().min(-20).max(20),
    investigation: Joi.number().integer().min(-20).max(20),
    medicine: Joi.number().integer().min(-20).max(20),
    nature: Joi.number().integer().min(-20).max(20),
    perception: Joi.number().integer().min(-20).max(20),
    performance: Joi.number().integer().min(-20).max(20),
    persuasion: Joi.number().integer().min(-20).max(20),
    religion: Joi.number().integer().min(-20).max(20),
    sleightOfHand: Joi.number().integer().min(-20).max(20),
    stealth: Joi.number().integer().min(-20).max(20),
    survival: Joi.number().integer().min(-20).max(20),
  }).optional(),

  equipment: Joi.array().items(Joi.string()).optional(),
  spells: Joi.array().items(Joi.string()).optional(),
  features: Joi.array().items(Joi.string()).optional(),
  notes: Joi.string().allow("").optional(),
});

module.exports = {
  characterDTO,
};
