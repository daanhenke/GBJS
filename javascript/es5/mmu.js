/*
    Memory interface
 */

MMU = {
    isBiosLoaded: true,

    Bios: [],
    Rom: [],
    VRAM: [],
    ERAM: [],
    ZRAM: [],

    readByte: function (address) {
        switch (address)
        {
            case 0x0000: //Bios or ROM 0
                if (MMU.isBiosLoaded)
                {
                    if (address < 0x0100)
                    {
                        return MMU.Bios[addr];
                    }
                    else if (z80.Registers.pc >= 0x0100)
                        MMU.isBiosLoaded = false;
                }

                return MMU.Rom[address];

            case 0x1000: //ROM 0
            case 0x2000: //ROM 0
            case 0x3000: //ROM 0
                return MMU.Rom[address];

            case 0x4000: //ROM 1
            case 0x5000: //ROM 1
            case 0x6000: //ROM 1
            case 0x7000: //ROM 1
                return MMU.Rom[address];

            case 0x8000: //VRAM
            case 0x9000: //VRAM
                return MMU.VRAM[address & 0x1FFF];

            case 0xA000: //ERAM
            case 0xB000: //ERAM
                return MMU.ERAM[address & 0x1FFF];

            case 0xC000: //WRAM
            case 0xD000: //WRAM
                return MMU.WRAM[address & 0x1FFF];

            case 0xE000: //WRAM SHADOW
                return MMU.WRAM[address & 0x1FFF];

            case 0xF000: //WRAM Shadow, I/O or Zero-Page RAM
                switch (address & 0x0F00)
                {
                    case 0xE00:
                        if (address < 0xFEA0)
                        {
                            //TODO
                            return 0;//GRAPHICS
                        }
                        else
                        {
                            return 0;
                        }

                    case 0xF00:
                        if (address >= 0xFF80)
                        {
                            return MMU.ZRAM[address & 0x7F];
                        }
                        else
                        {
                            return 0;
                        }
                }
        }
    },

    readWord: function (address) {
        return (MMU.readByte(address) + (MMU.readByte(address + 1) << 8))
    },

    writeByte: function (address, value) {
        //TODO
    },

    writeWord: function (address, value) {
        //TODO
    }
};