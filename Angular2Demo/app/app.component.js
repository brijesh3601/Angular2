(function () {

  window.app = {};


  app.AppComponent = ng.core.Component({
    selector: 'my-app',
    template: `	
							   <h3>{{hdrTxt}}</h3>
                 <button (click)="getIndoorPlants($event)" id="angularButton">Indoor Plants</button> <a  style="padding-left:10px; text-decoration:underline" (click)="showAll($event)" id="showAllLink">Show All</a>

                 <div *ngFor="let plant of plants "> {{plant}}</div>

						
					`,
    directives: [ng.core.NgFor]
  })
    .Class({
      constructor: [ng.core.NgZone, function (_ngZone) {
        


        this.hdrTxt = "";

        this.plants = [];


        this.indoorPlants = [
          'Peace Lily',
          'Delray',
          'Sansevieria',
          'Money Plant',
          'Lucky Bamboo',
          'Tulsi'
        ]

        this.outdoorPlants = [
          'Miss Molly',
          'Paprika Rosa',
          'Lemon Zest',
          'Autumn Sunburst',
          'Palm Tree',
          'Banyan'
        ]

       // this.plants = $.merge(this.indoorPlants, this.outdoorPlants);
       //this.plants.concat(this.indoorPlants, this.outdoorPlants);

       this.showAll();

       


        console.log(this.plants);


        //bind function to invoke from outside angular Component. getOutdoorPlants can be run outside angular Component.
        app.handler = {
          getOutdoorPlants: this.getOutdoorPlants.bind(this),
          zone: _ngZone
        };

      }],

      ngOnInit: function () {


      },
      ngAfterViewChecked: function () {

        //write logic here to execute post DOM rendering 

      },

      showAll(event){

        this.hdrTxt = "All Plants";

        $.merge( $.merge( this.plants, this.indoorPlants ), this.outdoorPlants );

      },
     
      getIndoorPlants(event) {

         this.hdrTxt = "Indoor Plants";

        //empty array , this.plants = [] does not work
        this.plants.length=0;
        
        //concat & merge does not work 
        //this.plants = $.merge([], this.indoorPlants);


      
          for(var i in this.outdoorPlants){

            this.plants.push(this.indoorPlants[i]);

          }

        

        console.log(this.plants + " -- " + event.target.id);

      },

      getOutdoorPlants(event) {


         //call function 
         //Component.zone.run(() => {Component.somefunction('1');})

          app.handler.zone.run(() => {


          this.hdrTxt = "Outdoor Plants";

          this.plants.length=0;

          for(var i in this.outdoorPlants){

            this.plants.push(this.outdoorPlants[i]);

          }

          
          

          console.log(this.plants);

      
          });

      }



      
    });
})();

