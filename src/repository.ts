import type { Wizard, Spell } from "./types"; 
import { ValidateSpellPower } from "./decorators"; // Exercice 4 - Étape 2

export class Repository<T extends { id: number }> {
  protected items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return [...this.items];
  }
}

export class WizardRepository extends Repository<Wizard> {
  // Exercice 2 - Étape 1
  findByHouse(house: Wizard["house"]): Wizard[] {
    return this.getAll().filter(
      wizard => wizard.house === house
    );
  }
}

// Exercice 4 - Étape 2
export class SpellRepository extends Repository<Spell> {
  @ValidateSpellPower
  override add(spell: Spell): void {
    super.add(spell);
  }
}