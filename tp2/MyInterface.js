import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        this.gui.add(this.scene, 'displayDiamond').name('Display diamond');

        this.gui.add(this.scene, 'displayTriangle').name('Display triangle');

        this.gui.add(this.scene, 'displayParallelogram').name('Display parallelogram');

        this.gui.add(this.scene, 'displayTriangleSmall').name('Display triangle small');

        this.gui.add(this.scene, 'displayTriangleBig').name('Display triangle big');

        this.gui.add(this.scene, 'displayTangram').name('Display tangram');

        this.gui.add(this.scene, 'displayMyUnitCube').name('Display unit cube');

        this.gui.add(this.scene, 'displayMyQuad').name('Display quad');

        this.gui.add(this.scene, 'displayMyUnitCubeQuad').name('Display unit cube quad');



        return true;
    }
}