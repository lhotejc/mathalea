import { droiteGraduee } from '../../../modules/2d/reperes.js'
import { mathalea2d } from '../../../modules/2dGeneralites.js'
import { texteEnCouleur } from '../../../modules/outils/contextSensitif.js'
import { randint } from '../../../modules/outils/entiers.js'
import { texNombre } from '../../../modules/outils/texNombres.js'
import Exercice from '../../Exercice.js'
export const titre = 'Trouver un nombre sur une droite graduée'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Date de publication septembre 2021
 * Référence can6N01
 */
export const uuid = 'fc190'
export const ref = 'canc3N02'
export default function SuiteSurDroiteGraduee () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nbQuestions = 1
  this.nouvelleVersion = function () {
    const a = randint(1, 6) // choix de la table = écart entre deux graduations
    const c = Math.floor(randint(10, 40) / a) * a // premier nombre.
    const maListe = []
    for (let i = 0; i < 3; i++) {
      maListe.push([c + a * i, texNombre(c + a * i)])
    }
    const d = droiteGraduee({
      Unite: 3 / a,
      Min: c - a,
      Max: c + 3 * a,
      x: 0,
      y: 0,
      thickDistance: a,
      thickSec: false,
      thickOffset: 0,
      axeStyle: '->',
      pointListe: [[c + a * 3, '']],
      labelListe: maListe,
      pointCouleur: 'blue',
      pointStyle: 'x',
      labelsPrincipaux: false
    })
    this.reponse = c + 3 * a
    this.question = `Quel est le nombre repéré par la croix ?<br>
    
    `

    this.question += mathalea2d({ xmin: -1, ymin: -1.5, xmax: 15, ymax: 1.5, scale: 0.6, style: 'margin: auto' }, d)
    this.correction = `${texteEnCouleur('Comme les graduations vont de ' + a)} ${texteEnCouleur('en ' + a)} ${texteEnCouleur(', le nombre repéré par la croix correspond à ')} ${texteEnCouleur(c + 2 * a)} ${texteEnCouleur(' + ' + a)} ${texteEnCouleur('donc c\'est ' + texNombre(c + 3 * a) + '.')}`
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
