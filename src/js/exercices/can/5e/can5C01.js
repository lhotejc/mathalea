import { texteEnCouleur } from '../../../modules/outils/contextSensitif.js'
import { randint } from '../../../modules/outils/entiers.js'
import { calcul } from '../../../modules/outils/texNombres.js'
import Exercice from '../../Exercice.js'
export const titre = 'Calculer un produit d’entiers'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can5C01
 */
export const uuid = '102f4'
export const ref = 'can5C01'
export default function ProduitEntiers5e () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const b = randint(5, 9)
    const a = randint(12, 19)
    this.reponse = calcul(a * b)
    this.question = `Calculer $${a} \\times ${b}$.`
    this.correction = `$${a} \\times ${b}=${a * b}$`
    this.correction += texteEnCouleur(`<br> Mentalement : <br>
    On décompose le calcul $${a} \\times ${b}$ en  $(10+${a - 10})\\times ${b}=10\\times ${b} +${a - 10}\\times ${b}$.<br>
       Cela donne :  $${10 * b}+${(a - 10) * b}=${this.reponse}$.
      `)
    this.canEnonce = this.question// 'Compléter'
    this.canReponseACompleter = ''
  }
}
