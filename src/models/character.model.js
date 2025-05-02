const mongoose = require("mongoose");
const { Schema } = mongoose;

const statsSchema = new Schema(
  {
    strength: Number,
    dexterity: Number,
    constitution: Number,
    intelligence: Number,
    wisdom: Number,
    charisma: Number,
  },
  { _id: false }
);

const skillsSchema = new Schema(
  {
    acrobatics: Number,
    animalHandling: Number,
    arcana: Number,
    athletics: Number,
    deception: Number,
    history: Number,
    insight: Number,
    intimidation: Number,
    investigation: Number,
    medicine: Number,
    nature: Number,
    perception: Number,
    performance: Number,
    persuasion: Number,
    religion: Number,
    sleightOfHand: Number,
    stealth: Number,
    survival: Number,
  },
  { _id: false }
);

const characterSchema = new Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    race: { type: String },
    class: { type: String },
    level: { type: Number, default: 1 },
    healthPoints: { type: Number },
    background: { type: String },
    stats: statsSchema,
    skills: skillsSchema,
    equipment: [{ type: String }],
    spells: [{ type: String }],
    features: [{ type: String }],
    notes: { type: String },
  },
  {
    timestamps: true,
  }
);

const Character = mongoose.model("Character", characterSchema);
module.exports = Character;
