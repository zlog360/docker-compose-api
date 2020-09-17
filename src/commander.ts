import shelljs from "shelljs";

// Base Commander will be distributed later on in a base-providor package
export abstract class BaseCommander {
  abstract shCmd: string;
  abstract shelljs: any;  
  abstract set shCommand(cmd: string);
  abstract get shCommand(): string;
  abstract exec(): void;
}


const logger = require("debug")("docker-compose:commander");

export class Commander extends BaseCommander {
    shCmd: string = '';
    shelljs: any = shelljs;
    
    set shCommand(cmd: string) {
    //    if (!this.shCommand.length) {
        //    this.shCmd = cmd;
    //    }
    //    else {
           this.shCmd = cmd;
    //    }
    }
    get shCommand(): string {
       return this.shCmd; 
    }
    clearCmd(): void {
        this.shCommand = '';
    }
    exec(command: string = this.shCommand): Promise<any> {
        logger(`Executing Command: ${command}`);
        return this.shelljs.exec(command);
    }
}