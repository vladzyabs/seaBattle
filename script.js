const record = document.getElementById('record'); // Рекорд
const shot = document.getElementById('shot'); // Кол. выстрелов
const hit = document.getElementById('hit'); // Кол. поаданий
const dead = document.getElementById('dead'); // Кол. потоплено
const enemy = document.getElementById('enemy'); // Таблица
const again = document.getElementById('again'); // Кнопка рекстарт
const header = document.querySelector('.header') //Заголовок
const gameOver = 'Игра окончена'

const game = {
	ships: [
		{
			location: ['11', '21', '31', '41'],
			hit: ['', '', '', '']
		}, 
		{
			location: ['33', '34', '35'],
			hit: ['', '', '']
		}, 
		{
			location: ['55', '65'],
			hit: ['', '']
		}, 
		{
			location: ['88'],
			hit: ['']
		},
	],
	shipCount: 4
}

const play = {
	record: localStorage.getItem('seaBattleRecord') || 0,
	shot: 0,
	hit: 0,
	dead: 0,
	set updateData (data) {
		this[data] ++
		this.render()
	},
	render () {
		record.textContent = this.record
		shot.textContent = this.shot
		hit.textContent = this.hit
		dead.textContent = this.dead
	}
};

const show = {
	hit (element) {
		this.changeClass(element, 'hit')
	},
	miss (element) {
		this.changeClass(element, 'miss')
	},
	dead (element) {
		this.changeClass(element, 'dead')
	},
	changeClass(element, value) {
		element.className = value
	},
};

const doubleClick = (e) => {
	e.classList.add('double-click')
	setTimeout(() => e.classList.remove('double-click'), 100)
}

const fire = (event) => {
	const target = event.target
	 if (target.classList.length > 0 || target.tagName !== 'TD' || header.textContent === gameOver) {
		return doubleClick(target)
	} else {
		show.miss(target)
		play.updateData = 'shot'
		for (let i = 0; i < game.ships.length; i++) {
			const ship = game.ships[i]
			const index = ship.location.indexOf(target.id)
			if (index >= 0) {
				show.hit(target)
				play.updateData = 'hit'
				ship.hit[index] = '1'
				const life = ship.hit.indexOf('')
				if (life < 0) {
					play.updateData = 'dead'
					for (const call of ship.location) {
						show.dead(document.getElementById(call))
					}
					game.shipCount -=1
					if (game.shipCount < 1) {
						header.textContent = gameOver
						header.style.color = 'red'
						if (play.shot < play.record || play.record === 0) {
							localStorage.setItem('seaBattleRecord', play.shot)
							play.record = play.shot
							play.render()
						}
					}
				}
			}
		}
	}
}

const init = () => {
	enemy.addEventListener('click', fire)
	play.render()
	again.addEventListener('click', () => {
		location.reload()
	})
}

init()