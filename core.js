class chip8{
  constructor(){
    var pc; //Program Counter
    var memory; //Memory
    var stack; //Stack
    var sp; //Stack pointer
    var v; // "V" Register
    var i; //Index register
    var delayTimer;
    var soundTimer;

    var chip8_fontset = [
      0xF0, 0x90, 0x90, 0x90, 0xF0, // 0
      0x20, 0x60, 0x20, 0x20, 0x70, // 1
      0xF0, 0x10, 0xF0, 0x80, 0xF0, // 2
      0xF0, 0x10, 0xF0, 0x10, 0xF0, // 3
      0x90, 0x90, 0xF0, 0x10, 0x10, // 4
      0xF0, 0x80, 0xF0, 0x10, 0xF0, // 5
      0xF0, 0x80, 0xF0, 0x90, 0xF0, // 6
      0xF0, 0x10, 0x20, 0x40, 0x40, // 7
      0xF0, 0x90, 0xF0, 0x90, 0xF0, // 8
      0xF0, 0x90, 0xF0, 0x10, 0xF0, // 9
      0xF0, 0x90, 0xF0, 0x90, 0x90, // A
      0xE0, 0x90, 0xE0, 0x90, 0xE0, // B
      0xF0, 0x80, 0x80, 0x80, 0xF0, // C
      0xE0, 0x90, 0x90, 0x90, 0xE0, // D
      0xF0, 0x80, 0xF0, 0x80, 0xF0, // E
      0xF0, 0x80, 0xF0, 0x80, 0x80  // F
    ];

  }

  initialize(){
    // Program counter
    this.pc = 0x200;
    // Memory
    this.memory = new Array(4096);
    // Stack
    this.stack = new Array(16);
    // Stack pointer
    this.sp = 0;
    // "V" registers
    this.v = new Array(16);
    // "I" register
    this.i = 0;
    // Delay timer
    this.delayTimer = 0;
    // Sound timer
    this.soundTimer = 0;

  }

  print(){
    console.log(this.pc);
  }

  loadProgram(program){
    for (var i = 0; i < program.length; i++){
      this.memory[i + 0x200] = program[i];
    }
    console.log(this.memory);
  }

  emulateCycle(){
    //The opcode is the next two bytes in the program counter, so we merge them and form one opcode.
    var opcode = this.memory[this.pc] << 8 | this.memory[this.pc + 1];
    var nn = this.memory[this.pc + 1];
    var x = (opcode | 0x0F00) >> 8; //x is always the "third" position in hex.
    var y = (opcode | 0x00F0) >> 4; //y is always the "second" position in hex.

    //Decode opcode
    switch (opcode & 0xF000) {
      //Execute opcode

      case (0x0000): //Call, display, or return?
        switch (opcode & 0x000F) {
          case 0x0000: // 0x00E0: Clear Screen
            //Clear Screen here.
            break;
          case 0x000E: // 0x00EE: Returns from subroutine
            //Return here.
            --sp; //Decrease the stack pointer
            pc = stack[sp]; //Get the address stored in stack
            break;
          default:
            //Raise unknown opcode 0x0000.
        }
        break;

      case (0x1000): // Jump to address NNN
        pc = opcode & 0x0FFFF;
        break;
      case (0x2000): // Calls subroutine at NNN (function pointer?)
        stack[sp] = pc; //Store current address of pc into the stack
        ++sp; //Increase the stack pointer
        pc = opcode & 0x0FFFF; //Change program counter to address at NNN.
        break;
      case (0x3000): //Skips the next instruction if Vx == NN
        if (x ==  nn){
          //DO STUFF
          pc += 4;
        }
        break;
      case (0x4000): //Skips next instruction if Vx equals Vy
        if (x != nn){
          //DO STUFF
          pc += 4;
        }
        break;
      case (0x5000): //Skips next instruction if Vx equals Vy
        if (x == y){
          //DO STUFF
          pc += 4;
        }
        break;
      case (0x6000): //Sets Vx to NN
        this.v[x] = nn
        pc += 2;
        break;
      case (0x7000): //Adds NN to Vx
        this.v[x] += nn;
        pc += 2;
        break;
      case (0x8000):
        switch (opcode & 0x000F) {
          case 0x0001: // Assign Vx to Vy
          case 0x0004: //Adds value of Vy to Vx
            if (v[y] > (0xFF - v[x])){
              v[0xF] = 1; //Carry bit
            } else {
              V[0xF] = 0;
            }
            V[x] += V[y];
            break;
        }
        break;
      default: //Unknown OPCODE
    }
    //End switch

    if(delay_timer > 0)
      --this.delay_timer;

    if(sound_timer > 0){
      if (sound_timer == 1){
        //BEEP
      }
      --sound_timer;
    }

  }


}
