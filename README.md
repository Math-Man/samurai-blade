# Samurai's Blade Mod for Binding of Isaac Repentance

samurai-blade is a mod for _[The Binding of Isaac: Repentance](https://store.steampowered.com/app/1426300/The_Binding_of_Isaac_Repentance/)_, written in [TypeScript](https://www.typescriptlang.org/) using the [IsaacScript](https://isaacscript.github.io/) framework.

### A familiar sword from a well-known samurai can now be found in the basement 
##### (Yes, it is Muramasa from Metal Gear Rising)
This mod only adds a single item called ```Samurai's Blade``` which can be found as a boss drop. Picking up This item changes Isaac's attack to a unique melee weapon.

```Samurai's Blade``` has direct and indirect synergies with ____ of vanilla and dlc items, so there is a lot to discover.

Although ```Samurai's Blade``` has stats of its own, all of its stats are modified by player's own stats.

<details>
  <summary>
    Player stats and what they effect (Spoilers?)
  </summary>

- Damage: Directly modifies damage by a factor of player's damage.
- Fire Delay: Higher fire rate reduces delay between swings.
- Shot speed: Higher shot speed reduces time required for blade to be charged.
- Range, Shot height etc.: Increases blade's arc size.
- Luck : Increases critical hit chance. ____ except it does not as crits are not a thing yet

</details>

<br/>

<details>
  <summary>
    All synergies (Spoilers?)
  </summary>

- All items/trinkets that give tear flags works!
- Items that increase tear count increases the number of hits done by blade each swing.

</details>

#### Known Issues

- Pretty much all complex synergies are missing apart from ones that increase tear count.
- No crits yet.

### Implementation and Technical Stuff
lol its a mess;

#### Synergy Mechanics
BOI has a lot items and I mean A LOT OF ITEMS. Unfortunetly I don't have time or patience to implement synergy for all of these items at once. So, I've taken a shortcut.

##### Tearflag Synergies
Every instance of damage done by the blade spawns a hidden tear with all tearflags of the player and with a reduced base damage multiplier, essentially unevenly splitting all damage dealt between the blade itself and tear and tearflag effects. Although this is extremely hacky, pretty much all tear flags are succesfully handled by doing this.

The only problem remaining is the VFX and SFX of the tear. To handle this I've simply switched tear type to the tear that is spawned by the spirit sword which has very minimal amount of effects and doesn't look out of place when combined with items like ```Cricket's Body```.

##### Complex Synergies
To handle complex synergies, the behavior needs to be injected into the flow of the code. Most special synergies are handled under ____. One such complex synergy is with the items that increase the number of shots isaac shoots every attack. There is no 'right' way of handling this synergy so I've simply increased the number of hits the blade attack can do to an enemy for every hit, this doesn't just effect the damage but the things such as knockback as well. I think this simulates the mechanical multiplier of these items almost perfectly.

#### Credits
- Base sound effects are from ________ Most of them are modified by me.
- Art by ____ ____steam profile goes here.
