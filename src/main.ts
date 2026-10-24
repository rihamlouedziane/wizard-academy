import type { NewWizard } from "./types"; // (ajout)
import { WizardRepository, SpellRepository } from "./repository"; // (ajout)
import type { SpellCastEvent } from "./types"; // Exercice 3
import { Cache } from "./decorators"; // Exercice 5
import type { House, Wizard } from "./types"; // Exercice 6

// ============ Exercice 1 : test (ajout, la slide ne donne pas le code) ============
const wizardRepo = new WizardRepository();

const newWizard: NewWizard = {
  name: "Harry Potter",
  house: "Gryffindor",
  level: 5,
  active: true
};

wizardRepo.add({ id: 1, ...newWizard });
console.log(wizardRepo.getAll());

// ============ Exercice 2 : test (ajout, la slide ne donne pas le code) ============
wizardRepo.add({ id: 2, name: "Draco Malfoy", house: "Slytherin", level: 5, active: true });
console.log(wizardRepo.findByHouse("Gryffindor"));

// ============ Exercice 3 - Étape 2 ============
function handleSpellCast(event: SpellCastEvent): void {
  console.log(
    `Wizard ${event.wizardId} cast ${event.spellName}`
  );
}

handleSpellCast({
  type: "spell-cast",
  wizardId: 1,
  spellName: "Expelliarmus"
});

// ============ Exercice 4 - Étape 3 ============
const spells = new SpellRepository(); // (ajout)

spells.add({
  id: 102,
  name: "Protego",
  category: "defense",
  power: 50
});

try { // (ajout) pour que le script continue après l'erreur
  spells.add({
    id: 103,
    name: "Invalid Spell",
    category: "attack",
    power: -10
  });
} catch (e) {
  console.log((e as Error).message); // "Spell power cannot be negative"
}

// ============ Exercice 5 - Étape 2 ============
class SpellCalculator {
  @Cache
  calculatePower(basePower: number, multiplier: number): number {
    console.log("Calculating...");

    return basePower * multiplier;
  }
}

const calculator = new SpellCalculator();

console.log(calculator.calculatePower(10, 3));
console.log(calculator.calculatePower(10, 3));
console.log(calculator.calculatePower(5, 2));

// ============ Exercice 6 - Étape 1 ============
const validHouses: readonly House[] = [
  "Gryffindor",
  "Slytherin",
  "Ravenclaw",
  "Hufflepuff"
];

function isHouse(value: unknown): value is House {
  return (
    typeof value === "string" &&
    validHouses.some(house => house === value)
  );
}

// ============ Exercice 6 - Étape 2 ============
function isWizard(value: unknown): value is Wizard {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === "number" &&
    typeof candidate.name === "string" &&
    isHouse(candidate.house) &&
    typeof candidate.level === "number" &&
    typeof candidate.active === "boolean"
  );
}

// ============ Exercice 6 - Étape 3 ============
const validData: unknown = {
  id: 1,
  name: "Harry Potter",
  house: "Gryffindor",
  level: 5,
  active: true
};

const invalidData: unknown = {
  id: 2,
  name: "Viktor",
  house: "Durmstrang",
  level: 5,
  active: true
};

console.log(isWizard(validData));   // true
console.log(isWizard(invalidData)); // false