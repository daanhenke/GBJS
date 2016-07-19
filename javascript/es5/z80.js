/*
    The Z80 is the Gameboy's CPU. It does most of the work in the system
 */

z80 =
{
    //The GB has 2 clocks (m & t)
    Clock:
    {
        m: 0,
        t: 0
    },

    //The GB has quite a fuck ton of registers
    Registers:
    {
        a: 0, b: 0, c: 0, d: 0, e: 0,
        h: 0, l: 0,
        f: 0,
        pc: 0, sp: 0,
        m: 0, t: 0 //Clocks
    },

    /*
        Flags (Stored in z80.Registers.f):
        0x10 -- Result of last instruction was > 255 (CARRY FLAG)
        0x40 -- Subtraction flag
        0x80 -- Result of last instruction was 0;
     */

    //All of the Z80's opcodes
    Opcodes:
    {
        //0x00 - No Operation, don't do shit for one cycle;
        NOP: function ()
        {
            z80.AddTime(1, 4);
        },

        //0x01 - Loads a 16
        LDbc_addr: function ()
        {
            z80.Registers.c = MMU.readByte(z80.Registers.pc + 1);
            z80.Registers.b = MMU.readByte(z80.Registers.pc + 2);
            z80.Registers.pc += 2;
            z80.AddTime(3, 12);
        },

        //0x83 - ADD's E to A;
        ADDa_e: function ()
        {
            z80.Registers.a += z80.Registers.e;
            z80.Registers.f = 0;

            z80.SetFlags(z80.REgisters.a);

            z80.Registers.a &= 255;

            z80.AddTime(1, 4);
        },

        //0xB8 - ComPares A & B, stores flags;
        CPa_b: function ()
        {
            var _a = z80.Registers.a;
            _a -= z80.Registers.b;
            z80.Registers.f |= 0x40;

            z80.SetFlags(_a);

            z80.AddTime(1, 4);
        },

        //0xB9 - ComPares A & C
        CPa_c: function ()
        {
            var _a = z80.Registers.a;
            _a -= z80.Registers.c;
            z80.Registers.f |= 0x40;

            z80.SetFlags(_a);

            z80.AddTime(1, 4);
        },

        //0xBA - ComPares A & D
        CPa_d: function ()
        {
            var _a = z80.Registers.a;
            _a -= z80.Registers.d;
            z80.Registers.f |= 0x40;

            z80.SetFlags(_a);

            z80.AddTime(1, 4);
        },

        //0xBB - ComPares A & E
        CPa_e: function ()
        {
            var _a = z80.Registers.a;
            _a -= z80.Registers.e;
            z80.Registers.f |= 0x40;

            z80.SetFlags(_a);

            z80.AddTime(1, 4);
        },
    },

    //Adds time to timers
    AddTime: function (_m, _t) {
        z80.Registers.m = _m;
        z80.Registers.t = _t;
    },

    //Sets FLAGS based on value
    SetFlags: function (value)
    {
        //Check for 0
        if (!(value & 0xFF))
        {
            z80.Registers.f |= 0x80;
        }

        //Check for underflow
        if (value < 0x00)
        {
            z80.Registers.f |= 0x10
        }

        //Check for overflow
        if (value > 0xFF)
        {
            z80.Registers.f |= 0x10
        }
    },

    LookupTable:
    [
        z80.Opcodes.NOP, //0x00
        z80.Opcodes.LDbc_addr, //0x01
        z80.Opcodes.NOP, //0x02
        z80.Opcodes.NOP, //0x03
        z80.Opcodes.NOP, //0x04
        z80.Opcodes.NOP, //0x05
        z80.Opcodes.NOP, //0x06
        z80.Opcodes.NOP, //0x07
        z80.Opcodes.NOP, //0x08
        z80.Opcodes.NOP, //0x09
        z80.Opcodes.NOP, //0x0A
        z80.Opcodes.NOP, //0x0B
        z80.Opcodes.NOP, //0x0C
        z80.Opcodes.NOP, //0x0D
        z80.Opcodes.NOP, //0x0E
        z80.Opcodes.NOP, //0x0F

        z80.Opcodes.NOP, //0x10
        z80.Opcodes.NOP, //0x11
        z80.Opcodes.NOP, //0x12
        z80.Opcodes.NOP, //0x13
        z80.Opcodes.NOP, //0x14
        z80.Opcodes.NOP, //0x15
        z80.Opcodes.NOP, //0x16
        z80.Opcodes.NOP, //0x17
        z80.Opcodes.NOP, //0x18
        z80.Opcodes.NOP, //0x19
        z80.Opcodes.NOP, //0x1A
        z80.Opcodes.NOP, //0x1B
        z80.Opcodes.NOP, //0x1C
        z80.Opcodes.NOP, //0x1D
        z80.Opcodes.NOP, //0x1E
        z80.Opcodes.NOP, //0x1F

        z80.Opcodes.NOP, //0x20
        z80.Opcodes.NOP, //0x21
        z80.Opcodes.NOP, //0x22
        z80.Opcodes.NOP, //0x23
        z80.Opcodes.NOP, //0x24
        z80.Opcodes.NOP, //0x25
        z80.Opcodes.NOP, //0x26
        z80.Opcodes.NOP, //0x27
        z80.Opcodes.NOP, //0x28
        z80.Opcodes.NOP, //0x29
        z80.Opcodes.NOP, //0x2A
        z80.Opcodes.NOP, //0x2B
        z80.Opcodes.NOP, //0x2C
        z80.Opcodes.NOP, //0x2D
        z80.Opcodes.NOP, //0x2E
        z80.Opcodes.NOP, //0x2F

        z80.Opcodes.NOP, //0x30
        z80.Opcodes.NOP, //0x31
        z80.Opcodes.NOP, //0x32
        z80.Opcodes.NOP, //0x33
        z80.Opcodes.NOP, //0x34
        z80.Opcodes.NOP, //0x35
        z80.Opcodes.NOP, //0x36
        z80.Opcodes.NOP, //0x37
        z80.Opcodes.NOP, //0x38
        z80.Opcodes.NOP, //0x39
        z80.Opcodes.NOP, //0x3A
        z80.Opcodes.NOP, //0x3B
        z80.Opcodes.NOP, //0x3C
        z80.Opcodes.NOP, //0x3D
        z80.Opcodes.NOP, //0x3E
        z80.Opcodes.NOP, //0x3F

        z80.Opcodes.NOP, //0x40
        z80.Opcodes.NOP, //0x41
        z80.Opcodes.NOP, //0x42
        z80.Opcodes.NOP, //0x43
        z80.Opcodes.NOP, //0x44
        z80.Opcodes.NOP, //0x45
        z80.Opcodes.NOP, //0x46
        z80.Opcodes.NOP, //0x47
        z80.Opcodes.NOP, //0x48
        z80.Opcodes.NOP, //0x49
        z80.Opcodes.NOP, //0x4A
        z80.Opcodes.NOP, //0x4B
        z80.Opcodes.NOP, //0x4C
        z80.Opcodes.NOP, //0x4D
        z80.Opcodes.NOP, //0x4E
        z80.Opcodes.NOP, //0x4F

        z80.Opcodes.NOP, //0x50
        z80.Opcodes.NOP, //0x51
        z80.Opcodes.NOP, //0x52
        z80.Opcodes.NOP, //0x53
        z80.Opcodes.NOP, //0x54
        z80.Opcodes.NOP, //0x55
        z80.Opcodes.NOP, //0x56
        z80.Opcodes.NOP, //0x57
        z80.Opcodes.NOP, //0x58
        z80.Opcodes.NOP, //0x59
        z80.Opcodes.NOP, //0x5A
        z80.Opcodes.NOP, //0x5B
        z80.Opcodes.NOP, //0x5C
        z80.Opcodes.NOP, //0x5D
        z80.Opcodes.NOP, //0x5E
        z80.Opcodes.NOP, //0x5F

        z80.Opcodes.NOP, //0x60
        z80.Opcodes.NOP, //0x61
        z80.Opcodes.NOP, //0x62
        z80.Opcodes.NOP, //0x63
        z80.Opcodes.NOP, //0x64
        z80.Opcodes.NOP, //0x65
        z80.Opcodes.NOP, //0x66
        z80.Opcodes.NOP, //0x67
        z80.Opcodes.NOP, //0x68
        z80.Opcodes.NOP, //0x69
        z80.Opcodes.NOP, //0x6A
        z80.Opcodes.NOP, //0x6B
        z80.Opcodes.NOP, //0x6C
        z80.Opcodes.NOP, //0x6D
        z80.Opcodes.NOP, //0x6E
        z80.Opcodes.NOP, //0x6F

        z80.Opcodes.NOP, //0x70
        z80.Opcodes.NOP, //0x71
        z80.Opcodes.NOP, //0x72
        z80.Opcodes.NOP, //0x73
        z80.Opcodes.NOP, //0x74
        z80.Opcodes.NOP, //0x75
        z80.Opcodes.NOP, //0x76
        z80.Opcodes.NOP, //0x77
        z80.Opcodes.NOP, //0x78
        z80.Opcodes.NOP, //0x79
        z80.Opcodes.NOP, //0x7A
        z80.Opcodes.NOP, //0x7B
        z80.Opcodes.NOP, //0x7C
        z80.Opcodes.NOP, //0x7D
        z80.Opcodes.NOP, //0x7E
        z80.Opcodes.NOP, //0x7F

        z80.Opcodes.NOP, //0x80
        z80.Opcodes.NOP, //0x81
        z80.Opcodes.NOP, //0x82
        z80.Opcodes.ADDa_e, //0x83
        z80.Opcodes.NOP, //0x84
        z80.Opcodes.NOP, //0x85
        z80.Opcodes.NOP, //0x86
        z80.Opcodes.NOP, //0x87
        z80.Opcodes.NOP, //0x88
        z80.Opcodes.NOP, //0x89
        z80.Opcodes.NOP, //0x8A
        z80.Opcodes.NOP, //0x8B
        z80.Opcodes.NOP, //0x8C
        z80.Opcodes.NOP, //0x8D
        z80.Opcodes.NOP, //0x8E
        z80.Opcodes.NOP, //0x8F

        z80.Opcodes.NOP, //0x90
        z80.Opcodes.NOP, //0x91
        z80.Opcodes.NOP, //0x92
        z80.Opcodes.NOP, //0x93
        z80.Opcodes.NOP, //0x94
        z80.Opcodes.NOP, //0x95
        z80.Opcodes.NOP, //0x96
        z80.Opcodes.NOP, //0x97
        z80.Opcodes.NOP, //0x98
        z80.Opcodes.NOP, //0x99
        z80.Opcodes.NOP, //0x9A
        z80.Opcodes.NOP, //0x9B
        z80.Opcodes.NOP, //0x9C
        z80.Opcodes.NOP, //0x9D
        z80.Opcodes.NOP, //0x9E
        z80.Opcodes.NOP, //0x9F

        z80.Opcodes.NOP, //0xA0
        z80.Opcodes.NOP, //0xA1
        z80.Opcodes.NOP, //0xA2
        z80.Opcodes.NOP, //0xA3
        z80.Opcodes.NOP, //0xA4
        z80.Opcodes.NOP, //0xA5
        z80.Opcodes.NOP, //0xA6
        z80.Opcodes.NOP, //0xA7
        z80.Opcodes.NOP, //0xA8
        z80.Opcodes.NOP, //0xA9
        z80.Opcodes.NOP, //0xAA
        z80.Opcodes.NOP, //0xAB
        z80.Opcodes.NOP, //0xAC
        z80.Opcodes.NOP, //0xAD
        z80.Opcodes.NOP, //0xAE
        z80.Opcodes.NOP, //0xAF

        z80.Opcodes.NOP, //0xB0
        z80.Opcodes.NOP, //0xB1
        z80.Opcodes.NOP, //0xB2
        z80.Opcodes.NOP, //0xB3
        z80.Opcodes.NOP, //0xB4
        z80.Opcodes.NOP, //0xB5
        z80.Opcodes.NOP, //0xB6
        z80.Opcodes.NOP, //0xB7
        z80.Opcodes.CPa_b, //0xB8
        z80.Opcodes.NOP, //0xB9
        z80.Opcodes.NOP, //0xBA
        z80.Opcodes.NOP, //0xBB
        z80.Opcodes.NOP, //0xBC
        z80.Opcodes.NOP, //0xBD
        z80.Opcodes.NOP, //0xBE
        z80.Opcodes.NOP, //0xBF

        z80.Opcodes.NOP, //0xC0
        z80.Opcodes.NOP, //0xC1
        z80.Opcodes.NOP, //0xC2
        z80.Opcodes.NOP, //0xC3
        z80.Opcodes.NOP, //0xC4
        z80.Opcodes.NOP, //0xC5
        z80.Opcodes.NOP, //0xC6
        z80.Opcodes.NOP, //0xC7
        z80.Opcodes.NOP, //0xC8
        z80.Opcodes.NOP, //0xC9
        z80.Opcodes.NOP, //0xCA
        z80.Opcodes.NOP, //0xCB
        z80.Opcodes.NOP, //0xCC
        z80.Opcodes.NOP, //0xCD
        z80.Opcodes.NOP, //0xCE
        z80.Opcodes.NOP, //0xCF

        z80.Opcodes.NOP, //0xD0
        z80.Opcodes.NOP, //0xD1
        z80.Opcodes.NOP, //0xD2
        z80.Opcodes.NOP, //0xD3
        z80.Opcodes.NOP, //0xD4
        z80.Opcodes.NOP, //0xD5
        z80.Opcodes.NOP, //0xD6
        z80.Opcodes.NOP, //0xD7
        z80.Opcodes.NOP, //0xD8
        z80.Opcodes.NOP, //0xD9
        z80.Opcodes.NOP, //0xDA
        z80.Opcodes.NOP, //0xDB
        z80.Opcodes.NOP, //0xDC
        z80.Opcodes.NOP, //0xDD
        z80.Opcodes.NOP, //0xDE
        z80.Opcodes.NOP, //0xDF

        z80.Opcodes.NOP, //0xE0
        z80.Opcodes.NOP, //0xE1
        z80.Opcodes.NOP, //0xE2
        z80.Opcodes.NOP, //0xE3
        z80.Opcodes.NOP, //0xE4
        z80.Opcodes.NOP, //0xE5
        z80.Opcodes.NOP, //0xE6
        z80.Opcodes.NOP, //0xE7
        z80.Opcodes.NOP, //0xE8
        z80.Opcodes.NOP, //0xE9
        z80.Opcodes.NOP, //0xEA
        z80.Opcodes.NOP, //0xEB
        z80.Opcodes.NOP, //0xEC
        z80.Opcodes.NOP, //0xED
        z80.Opcodes.NOP, //0xEE
        z80.Opcodes.NOP, //0xEF

        z80.Opcodes.NOP, //0xF0
        z80.Opcodes.NOP, //0xF1
        z80.Opcodes.NOP, //0xF2
        z80.Opcodes.NOP, //0xF3
        z80.Opcodes.NOP, //0xF4
        z80.Opcodes.NOP, //0xF5
        z80.Opcodes.NOP, //0xF6
        z80.Opcodes.NOP, //0xF7
        z80.Opcodes.NOP, //0xF8
        z80.Opcodes.NOP, //0xF9
        z80.Opcodes.NOP, //0xFA
        z80.Opcodes.NOP, //0xFB
        z80.Opcodes.NOP, //0xFC
        z80.Opcodes.NOP, //0xFD
        z80.Opcodes.NOP, //0xFE
        z80.Opcodes.NOP //0xFF

    ]


};