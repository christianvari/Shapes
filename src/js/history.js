import {Obstacle} from "./obstacle.js";
import { LinkedList } from "./linked_list.js";



export class History{

    constructor(){
        this.last_generated_obstacle_left = null;
        this.last_generated_obstacle_center = null;
        this.last_generated_obstacle_right = null;

        this.obstacle_order = new LinkedList();        

    }

    getLastLeftPositionZ(){
        if(this.last_generated_obstacle_left==null) return null;
        return this.last_generated_obstacle_left.getTailPositionZ();
    }

    getLastRightPositionZ(){
        if(this.last_generated_obstacle_right==null) return null;
        return this.last_generated_obstacle_right.getTailPositionZ();
    }

    getLastCenterPositionZ(){
        if(this.last_generated_obstacle_center==null) return null;
        return this.last_generated_obstacle_center.getTailPositionZ();
    }

    getObstacleList(){
        return this.obstacle_order;
    }
}