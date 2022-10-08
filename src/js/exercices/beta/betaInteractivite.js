import Exercice from '../Exercice.js'
import { randint, listeQuestionsToContenu } from '../../modules/outils.js'
import { labelPoint, point, pointAdistance, triangle2points2longueurs } from '../../modules/2d.js'
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
      ;[A.nom, B.nom, C.nom] = 'ABC'.split('')
      if (context.isHtml) {
        texte = `<div id="divM2dEx${numeroExercice}Q${i}"></div>` // On place notre div qui n'est qu'un texte tant que l'exercice n'est pas affiché
      } else {
        texte = mathalea2d({ xmin: Math.min(A.x, B.x, C.x), ymin: Math.min(A.y, B.y, C.y), xmax: Math.max(A.x, B.x, C.x), ymax: Math.max(A.y, B.y, C.y) }, triangle)
      }
      texteCorr = ''

      const divM2d = document.createElement('div') // Notre nouveau div de type HTMLElement (et non plus un string)
      divM2d.innerHTML = mathalea2d({ xmin: Math.min(A.x, B.x, C.x) - 1, ymin: Math.min(A.y, B.y, C.y) - 1, xmax: Math.max(A.x, B.x, C.x) + 1, ymax: Math.max(A.y, B.y, C.y) + 1 }, triangle, labelPoint(A, B, C))

      function insertInDom () {
        const div = document.querySelector(`#divM2dEx${numeroExercice}Q${i - 1}`) // Quand insertInDom sera exécuté, le i aura été incrémenté d'où ce i - 1
        if (div) {
          div.innerHTML = ''
          div.appendChild(divM2d)
          const polygons = div.querySelectorAll('polygon')
          const button = document.createElement('button')
          button.innerText = 'Polygones en couleur'
          button.onclick = () => {
            polygons.forEach(e => { e.setAttribute('stroke', (e.getAttribute('stroke') === 'black') ? 'blue' : 'black') })
          }
          div.appendChild(button)
          button.classList.add('btn', 'ui', 'icon', 'button')
          document.removeEventListener('exercicesAffiches', insertInDom)
        }
      }
      document.addEventListener('exercicesAffiches', insertInDom)

      if (this.questionJamaisPosee(i, B.x, B.y)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
