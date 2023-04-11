import {CGFobject} from '../lib/CGF.js';
/**
* MySphere
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MySphere extends CGFobject {

    constructor(scene, slices, stacks) {
        super(scene);
        this.stacks = stacks;
        this.slices = slices;
    
        this.initBuffers();
      }
    
      /**
       * @method initBuffers
       * Initializes the sphere buffers
       * TODO: DEFINE TEXTURE COORDINATES
       */
      initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
    
        var phi = 0;
        var theta = 0;
        var phiInc = Math.PI / this.stacks;
        var thetaInc = (2 * Math.PI) / this.slices;
    
        // build an all-around stack at a time, starting on "north pole" and proceeding "south"
        for (let i = 0; i <= this.stacks; i++) {
          var sinPhi = Math.sin(phi);
          var cosPhi = Math.cos(phi);
    
          // in each stack, build all the slices around
          theta = 0;
          for (let j = 0; j <= this.slices; j++) {
            //--- Vertices coordinates
            var x = Math.cos(theta) * sinPhi;
            var y = cosPhi;
            var z = Math.sin(-theta) * sinPhi;
            this.vertices.push(x, y, z);
    
            //--- Indices
            if (i < this.stacks && j < this.slices) {
              var current = i * (this.slices + 1) + j;
              var next = current + (this.slices + 1);
              // pushing two triangles using indices from this round (current, current+1)
              // and the ones directly south (next, next+1)
              // (i.e. one full round of slices ahead)
              
              this.indices.push(current + 1, current, next);
              this.indices.push(current + 1, next, next +1);
            }
    
            //--- Normals
            // at each vertex, the direction of the normal is equal to 
            // the vector from the center of the sphere to the vertex.
            // in a sphere of radius equal to one, the vector length is one.
            // therefore, the value of the normal is equal to the position vectro
            this.normals.push(x, y, z);
            theta += thetaInc;
    
            //--- Texture Coordinates
            // To be done... 
            // May need some additional code also in the beginning of the function.
            this.texCoords.push(j/this.slices, i/this.stacks);
            
          }
          phi += phiInc;
        }
    
       

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    setFillMode() { 
		this.primitiveType=this.scene.gl.TRIANGLE_STRIP;
	}

	setLineMode() 
	{ 
		this.primitiveType=this.scene.gl.LINES;
	}

    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
};

