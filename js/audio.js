class Audio {
	constructor() {
		//Create listeners
		this.playerFireSound = new Howl({
			src : [ 'audio/Cannon.wav' ],
			autoplay : false,
			loop : false,
			volume : 0.2,
		});
		
		
		this.loadSound = new Howl({
			src : [ 'audio/BackgroundMusic.mp3' ],
			autoplay : true,
			loop : true,
			volume : 0.5,
		});
		
		// Play the load sound here
		this.loadSound.play();
		
		// Play the buttonClick sound
		this.buttonClick = new Howl({
			src : [ 'audio/buttonClick.mp3' ]
		});
		
		//  create and play the winSound here
		this.winSound = new Howl({
		 src: ['audio/EndGame.mp3'],
		 autoplay: false,
		 loop: false,
		 volume: 0.5,
		});
	}	
}