import type { Wizard, Spell } from "./types"; 
import { ValidateSpellPower } from "./decorators"; 

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
  findByHouse(house: Wizard["house"]): Wizard[] {
    return this.getAll().filter(
      wizard => wizard.house === house
    );
  }
}

export class SpellRepository extends Repository<Spell> {
  @ValidateSpellPower
  override add(spell: Spell): void {
    super.add(spell);
  }
}