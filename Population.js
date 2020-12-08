class Population{
    constructor(num, target, mutation){
        this.num = num
        this.mutation = mutation
        this.target = target
        this.population = []
        this.averageFitness = 0.0
        this.matchingPool = []
        this.best = new DNA(target.length)
        this.finished = false
        this.generation = 0

        for (let i = 0; i < num; i ++){
            this.population[i] = new DNA(target.length)
            print(this.population[i])
        }
    }

    listDNAs(DNAList){
        var list = DNAList
        this.population.map((dna, i) => {
            list += dna.getFrase() + "<br>"
        })

        return list
    }

    updateFitness(){
        var soma = 0
        this.population.forEach((dna)=>{
            var p = 0
            for (let i = 0; i < this.target.length; i++) {
                const c = this.target[i];
                if (c === dna.genes[i]) {
                    p ++
                }
            }
            dna.fitness = p/this.target.length
            soma += dna.fitness
        })
        this.averageFitness = soma/this.population.length
    }

    selection(){
        this.matchingPool = []

        this.population.forEach((dna)=>{
            for(let i = 0; i < dna.fitness * 100; i++){
                this.matchingPool.push(dna)
            }
        })
    }

    selectBest(){
        let world_record = 0
        let index = 0

        this.population.map((dna, i)=>{
            if (dna.fitness > world_record) {
                index = i
                world_record = dna.fitness
            }
        })
        
        this.best = this.population[index]
        if (this.best.getFrase() === this.target){
            this.finished = true
        }
    }

    reproduce(){
        for (let i = 0; i < this.num; i++){
            let a = floor(random(this.matchingPool.length))
            let b = floor(random(this.matchingPool.length))
            let parentA = this.matchingPool[a]
            let parentB = this.matchingPool[b]
            let child = parentA.crossover(parentB)
            child.mutate(this.mutation)
            this.population[i] = child
        }
        this.generation ++
    }
}