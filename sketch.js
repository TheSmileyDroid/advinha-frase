let population
let DNAList
let averageFitnessP
let bestP
let generation
let input
let run

function setup() {
  input = createInput()
  input.value()
  run = createButton('Rodar')
  run.mouseClicked(function (){
    print('Clique')
    population = new Population(200, input.value(), 0.2)
    population.updateFitness()
    loop()
  })
  bestP = createP('Melhor: ')
  bestP.addClass('text')
  generation = createP('Geração: ')
  generation.addClass('text')
  averageFitnessP = createP("Fitness médio: ")
  averageFitnessP.addClass('text')
  DNAList = createP('Lista de DNAs:<br>')
  

  population = new Population(200, "Algoritimo genetico", 0.2)

  population.updateFitness()
}

function draw() {

  population.selection()

  population.reproduce()

  population.updateFitness()

  population.selectBest()


  bestP.html('Melhor: ' + population.best.getFrase())

  generation.html('Geração: '+ population.generation)

  averageFitnessP.html("Fitness médio: " + population.averageFitness * 100 + "%")

  lista = 'Lista de DNAs:<br>'
  lista = population.listDNAs(lista)
  DNAList.html(lista)

  if (population.finished) {
    noLoop()
  }
}
