import Exercice from '../Exercice.js'
import { randint, listeQuestionsToContenu } from '../../modules/outils.js'
import { point, pointAdistance, triangle2points2longueurs } from '../../modules/2d.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
export const titre = 'HTMLElement Interactif'

export const dateDePublication = '8/10/2022'

/**
 * Description didactique de l'exercice
 * @author
 * Référence
*/
export default class nomExercice extends Exercice {
  constructor () {
    super()
    this.consigne = 'Calcule'
    this.nbQuestions = 10
    this.tailleDiaporama = 3
  }

  nouvelleVersion (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const A = point(0, 0)
      const B = pointAdistance(A, randint(3, 7))
      const triangle = triangle2points2longueurs(A, B, 7, 9)
      const C = triangle.listePoints[2]
      if (context.isHtml) {
        texte = `div : divEx${numeroExercice}Q${i}`
        texte += `<div id="divEx${numeroExercice}Q${i}"></div>`
      } else {
        texte = mathalea2d({ xmin: Math.min(A.x, B.x, C.x), ymin: Math.min(A.y, B.y, C.y), xmax: Math.max(A.x, B.x, C.x), ymax: Math.max(A.y, B.y, C.y) }, triangle)
      }
      texteCorr = ''

      const divM2d = document.createElement('div')
      divM2d.innerHTML = mathalea2d({ xmin: Math.min(A.x, B.x, C.x), ymin: Math.min(A.y, B.y, C.y), xmax: Math.max(A.x, B.x, C.x), ymax: Math.max(A.y, B.y, C.y) }, triangle)

      if (this.questionJamaisPosee(i, B.x, B.y)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
        document.addEventListener('exercicesAffiches', () => {
          const div = document.querySelector(`#divEx${numeroExercice}Q${i - 1}`) // Attention à la synchronisation
          if (div) {
            div.innerHTML = ''
            div.appendChild(divM2d)
            const button = document.createElement('button')
            button.innerText = 'Couleur'
            button.onclick = () => {
              const polygons = div.querySelectorAll('polygon')
              polygons.forEach(e => { e.setAttribute('stroke', (e.getAttribute('stroke') === 'black') ? 'blue' : 'black') })
            }
            div.appendChild(button)
            button.classList.add('btn', 'ui', 'icon', 'button')
          }
        })
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
