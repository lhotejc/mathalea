import Exercice from '../Exercice.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { randint } from '../../modules/outils/entiers.js'
import { ecritureAlgebrique, ecritureAlgebriqueSauf1, ecritureParentheseSiNegatif, rienSi1 } from '../../modules/outils/ecritures.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseenforme.js'
export const interactifReady = true
export const interactifType = 'mathLive'
export const titre = 'Déterminer la forme canonique d\'un polynôme du second degré'

/**
 * Calcul de discriminant pour identifier la forme graphique associée (0 solution dans IR, 1 ou 2)
 * @author Stéphane Guyon
 * Référence 1E11
*/
export const uuid = '60504'
export const ref = '1E11-3'
export default function Formacanonique () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.nbQuestions = 4
  this.nbCols = 2
  this.nbColsCorr = 2
  this.spacingCorr = 3

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.consigne = 'Déterminer la forme canonique ' + (this.nbQuestions === 1 ? 'du polynôme' : 'de chacun des polynômes') + ' $P$, défini pour tout $x \\in \\mathbb{R}$ par : '
    if (this.interactif) {
      // this.consigne += '<br> '
    }

    for (let i = 0, texte, texteCorr, a, b, c, alpha, beta, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // k(x-x1)(x-x2)
      alpha = randint(-5, 5, [0])
      beta = randint(-5, 5, [0])
      a = randint(-4, 4, [0])
      b = -2 * a * alpha
      c = a * alpha * alpha + beta

      texte = `$P(x)=${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}$`
      texteCorr = '<br>On sait que si le polynôme, sous forme développée, s\'écrit $P(x)=ax^2+bx+c,$'
      texteCorr += 'alors sa forme canonique est de la forme $P(x)=a(x-\\alpha)^2+\\beta$,'

      texteCorr += '<br>avec $\\alpha=\\dfrac{-b}{2a}$ et $\\beta=P(\\alpha).$'
      texteCorr += `<br>Avec l'énoncé : $a=${a}$ et $b=${b}$, on en déduit que $\\alpha=${alpha}$.`
      texteCorr += `<br>On calcule alors $\\beta=P(${alpha})$, et on obtient au final que $\\beta=${beta}$.`
      texteCorr += `<br>d'où, $P(x)=${(a)}\\big(x-${ecritureParentheseSiNegatif(alpha)}\\big)^2+${ecritureParentheseSiNegatif(beta)}$`
      texteCorr += '<br>Au final, $P(x)='
      if (a === 1 || a === -1) {
        if (a === -1) { texteCorr += '-' }
      } else { texteCorr += `${a}` }
      texteCorr += `(x ${ecritureAlgebrique(-alpha)})^2`
      if (beta !== 0) { texteCorr += `${ecritureAlgebrique(beta)}` }
      texteCorr += '$'
      if (beta > 0) {
        if (alpha > 0) { setReponse(this, i, [`${a}(x-${alpha})^2+${beta}`]) } else { setReponse(this, i, [`${a}(x+${-alpha})^2+${beta}`]) }
      }
      if (beta < 0) {
        if (alpha > 0) { setReponse(this, i, [`${a}(x-${alpha})^2${beta}`]) } else { setReponse(this, i, [`${a}(x+${-alpha})^2${beta}`]) }
      }
      if (beta === 0) { if (alpha > 0) { setReponse(this, i, [`${a}(x-${alpha})^2`]) } else { setReponse(this, i, [`${a}(x+${-alpha})^2}`]) } }

      texte += ajouteChampTexteMathLive(this, i)
      if (this.questionJamaisPosee(i, a, b, c)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
