function __AddIgnitionCut(){
	switch (rom.base) {
	    case rtP28:
	      alert("no support");
	      break;
	    case rtP30:
			//alert('p30');
	       if (!confirm("Would you like to install Ignition Cut on P30?")) return;
	    	rom.gup();
	    	 __WriteIgnitionCut_P30();
           	rom.gup();
           	reload();
	      	break;
	    case rtP72:
	      alert("no support");
	      break;
	      }
}

function __WriteIgnitionCut_P30()
{   
	//ClearByte P30 - NOT USED
	rom.byteAt(0x0590) = 0xF9;
	rom.wordAt(0x0591) = 0x24CB;
	rom.byteAt(0x0593) = 0xFF;

	//Add FlagRevLimiter - USED
	//clear old datalog
	_rom_fill(0x6b56, 0x6c67, 0xFF);
	//clear label_05C0
	_rom_fill(0x05C0, 0x05CF, 0xFF);
	//Set Jump to 6B56
	rom.byteAt(0x05BD) = 0x03;
	rom.wordAt(0x05BE) = 0x6B56;
	//Set 6B56
	_rom_write(0x6B56,
				new Array(0xF9, 0xED, 0x1C, 0x14, 0xEC, 0x1C, 0x11, 0xE9,
						  0x22, 0x0E, 0xE0, 0xAE, 0x03, 0xB0, 0xB6, 0x03,
						  0x82, 0xCD, 0x05, 0x67, 0xFF, 0xFF, 0xCB, 0x00,
						  0x03, 0xD0, 0x05),
				0x1B);

	//Read Rpm before, used for !?
	_rom_write(0x17E5,
				new Array(0xC5, 0xB9, 0xC0, 0x2B, 0xCD, 0x18, 0xEE, 0x12,
						  0x0D, 0xC5, 0x98, 0x2A, 0xCA, 0x08),
				0x0E);
				
				
	//PSWL.4 Remover
	rom.wordAt(0x1922) = 0x29CB;
	rom.wordAt(0x1924) = 0xFFFF;
}

function __PluginInfo()
{
Alert('Ignition cut code by Bouletmarc');
}

addPlugin('Calvin Baank', 'Ignition Cut - BM', '__AddIgnitionCut()', '__PluginInfo()', 1);