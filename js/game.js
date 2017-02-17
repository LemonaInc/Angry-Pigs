

class Game {
	constructor() {}
	
	update() {}
	
	render() {}
	
	run() {

		let frame = ( timestamp ) => {
			this.update();
			this.render();
			
			window.requestAnimationFrame( frame );	
		}
		
		window.requestAnimationFrame( frame );
	}
}

$(document).ready( () => {
	let game = new Game();
	game.run();
})