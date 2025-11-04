const funcConvertGs1AIToTitle = (gs1AI) => {
  switch(gs1AI){
    case "00":
      return "SSCC";
    case "01":
      return "GTIN";
    case "02":
      return "CONTENT";
    case "10":
      return "BATCH/LOT";
    case "11":
      return "PROD DATE";
    case "12":
      return "DUE DATE";
    case "13":
      return "PACK DATE";
    case "15":
      return "BEST BY";
    case "16":
      return "SELL BY";
    case "17":
      return "EXPIRY";
    case "20":
      return "VARIANT";
    case "21":
      return "SERIAL";
    case "22":
      return "CPV";
    case "235":
      return "TPX";
    case "240":
      return "ADDITIONAL ID";
    case "241":
      return "CUST. PART No.";
    case "242":
      return "MTO VARIANT";
    case "243":
      return "PCN";
    case "250":
      return "SECONDARY SERIAL";
    case "251":
      return "REF. TO SOURCE";
    case "253":
      return "GDTI";
    case "254":
      return "GLN EXTENSION COMPONENT";
    case "255":
      return "GCN";
    case "30":
      return "VAR. COUNT";
    case "310n":
      return "NET WEIGHT (kg)";
    case "311n":
      return "LENGTH (m)";
    case "312n":
      return "WIDTH (m)";
    case "313n":
      return "HEIGHT (m)";
    case "314n":
      return "AREA (m2)";
    case "315n":
      return "NET VOLUME (l)";
    case "316n":
      return "NET VOLUME (m3)";
    case "320n":
      return "NET WEIGHT (lb)";
    case "321n":
      return "LENGTH (in)";
    case "322n":
      return "LENGTH (ft)";
    case "323n":
      return "LENGTH (yd)";
    case "324n":
      return "WIDTH (in)";
    case "325n":
      return "WIDTH (ft)";
    case "326n":
      return "WIDTH (yd)";
    case "327n":
      return "HEIGHT (in)";
    case "328n":
      return "HEIGHT (ft)";
    case "329n":
      return "HEIGHT (yd)";
    case "330n":
      return "GROSS WEIGHT (kg)";
    case "331n":
      return "LENGTH (m), log";
    case "332n":
      return "WIDTH (m), log";
    case "333n":
      return "HEIGHT (m), log";
    case "334n":
      return "AREA (m2), log";
    case "335n":
      return "VOLUME (l), log";
    case "336n":
      return "VOLUME (m3), log";
    case "337n":
      return "KG PER m²";
    case "340n":
      return "GROSS WEIGHT (lb)";
    case "341n":
      return "LENGTH (in), log";
    case "342n":
      return "LENGTH (ft), log";
    case "343n":
      return "LENGTH (yd), log";
    case "344n":
      return "WIDTH (in), log";
    case "345n":
      return "WIDTH (ft), log";
    case "346n":
      return "WIDTH (yd), log";
    case "347n":
      return "HEIGHT (in), log";
    case "348n":
      return "HEIGHT (ft), log";
    case "349n":
      return "HEIGHT (yd), log";
    case "350n":
      return "AREA (in2)";
    case "351n":
      return "AREA (ft2)";
    case "352n":
      return "AREA (yd2)";
    case "353n":
      return "AREA (in2), log";
    case "354n":
      return "AREA (ft2), log";
    case "355n":
      return "AREA (yd2), log";
    case "356n":
      return "NET WEIGHT (t)";
    case "357n":
      return "NET VOLUME (oz)";
    case "360n":
      return "NET VOLUME (q)";
    case "361n":
      return "NET VOLUME (g)";
    case "362n":
      return "VOLUME (q), log";
    case "363n":
      return "VOLUME (g), log";
    case "364n":
      return "VOLUME (in3)";
    case "365n":
      return "VOLUME (ft3)";
    case "366n":
      return "VOLUME (yd3)";
    case "367n":
      return "VOLUME (in3), log";
    case "368n":
      return "VOLUME (ft3), log";
    case "369n":
      return "VOLUME (yd3), log";
    case "37":
      return "COUNT";
    case "390n":
      return "AMOUNT";
    case "391n":
      return "AMOUNT";
    case "392n":
      return "PRICE";
    case "393n":
      return "PRICE";
    case "394n":
      return "PRCNT OFF";
    case "395n":
      return "PRICE/UoM";
    case "400":
      return "ORDER NUMBER";
    case "401":
      return "GINC";
    case "402":
      return "GSIN";
    case "403":
      return "ROUTE";
    case "410":
      return "SHIP TO LOC";
    case "411":
      return "BILL TO";
    case "412":
      return "PURCHASE FROM";
    case "413":
      return "SHIP FOR LOC";
    case "414":
      return "LOC No.";
    case "415":
      return "PAY TO";
    case "416":
      return "PROD/SERV LOC";
    case "417":
      return "PARTY";
    case "420":
      return "SHIP TO POST";
    case "421":
      return "SHIP TO POST";
    case "422":
      return "ORIGIN";
    case "423":
      return "COUNTRY - INITIAL PROCESS";
    case "424":
      return "COUNTRY - PROCESS";
    case "425":
      return "COUNTRY - DISASSEMBLY";
    case "426":
      return "COUNTRY - FULL PROCESS";
    case "427":
      return "ORIGIN SUBDIVISION";
    case "4300":
      return "SHIP TO COMP";
    case "4301":
      return "SHIP TO NAME";
    case "4302":
      return "SHIP TO ADD1";
    case "4303":
      return "SHIP TO ADD2";
    case "4304":
      return "SHIP TO SUB";
    case "4305":
      return "SHIP TO LOC";
    case "4306":
      return "SHIP TO REG";
    case "4307":
      return "SHIP TO COUNTRY";
    case "4308":
      return "SHIP TO PHONE";
    case "4309":
      return "SHIP TO GEO";
    case "4310":
      return "RTN TO COMP";
    case "4311":
      return "RTN TO NAME";
    case "4312":
      return "RTN TO ADD1";
    case "4313":
      return "RTN TO ADD2";
    case "4314":
      return "RTN TO SUB";
    case "4315":
      return "RTN TO LOC";
    case "4316":
      return "RTN TO REG";
    case "4317":
      return "RTN TO COUNTRY";
    case "4318":
      return "RTN TO POST";
    case "4319":
      return "RTN TO PHONE";
    case "4320":
      return "SRV DESCRIPTION";
    case "4321":
      return "DANGEROUS GOODS";
    case "4322":
      return "AUTH LEAVE";
    case "4323":
      return "SIG REQUIRED";
    case "4324":
      return "NBEF DEL DT";
    case "4325":
      return "NAFT DEL DT";
    case "4326":
      return "REL DATE";
    case "4330":
      return "MAX TEMP F";
    case "4331":
      return "MAX TEMP C";
    case "4332":
      return "MIN TEMP F";
    case "4333":
      return "MIN TEMP C";
    case "7001":
      return "NSN";
    case "7002":
      return "MEAT CUT";
    case "7003":
      return "EXPIRY TIME";
    case "7004":
      return "ACTIVE POTENCY";
    case "7005":
      return "CATCH AREA";
    case "7006":
      return "FIRST FREEZE DATE";
    case "7007":
      return "HARVEST DATE";
    case "7008":
      return "AQUATIC SPECIES";
    case "7009":
      return "FISHING GEAR TYPE";
    case "7010":
      return "PROD METHOD";
    case "7011":
      return "TEST BY DATE";
    case "7020":
      return "REFURB LOT";
    case "7021":
      return "FUNC STAT";
    case "7022":
      return "REV STAT";
    case "7023":
      return "GIAI - ASSEMBLY";
    // Note: '703s' typically implies a range (e.g., 7030-7039) or a structure, 
    // using '703' as a placeholder for the fixed-length AI.
    case "703s": 
      return "PROCESSOR";
    case "7040":
      return "UIC+EXT";
    case "710":
      return "NHRN PZN";
    case "711":
      return "NHRN CIP";
    case "712":
      return "NHRN CN";
    case "713":
      return "NHRN DRN";
    case "714":
      return "NHRN AIM";
    case "715":
      return "NHRN NDC";
    // Note: '723s' implies a range (e.g., 7230-7239) or a structure, 
    // using '723' as a placeholder for the fixed-length AI.
    case "723s": 
      return "CERT";
    case "7240":
      return "PROTOCOL";
    case "7241":
      return "AIDC MEDIA TYPE";
    case "7242":
      return "VCN";
    case "8001":
      return "DIMENSIONS";
    case "8002":
      return "CMT No.";
    case "8003":
      return "GRAI";
    case "8004":
      return "GIAI";
    case "8005":
      return "PRICE PER UNIT";
    case "8006":
      return "ITIP";
    case "8007":
      return "IBAN";
    case "8008":
      return "PROD TIME";
    case "8009":
      return "OPTSEN";
    case "8010":
      return "CPID";
    case "8011":
      return "CPID SERIAL";
    case "8012":
      return "VERSION";
    case "8013":
      return "GMN";
    case "8017":
      return "GSRN - PROVIDER";
    case "8018":
      return "GSRN - RECIPIENT";
    case "8019":
      return "SRIN";
    case "8020":
      return "REF No.";
    case "8026":
      return "ITIP CONTENT";
    case "8030":
      return "DIGSIG";
    // case "8110":
    //   return "-";
    case "8111":
      return "POINTS";
    // case "8112":
    //   return "-";
    case "8200":
      return "PRODUCT URL";
  }
  let intAI = parseInt(gs1AI);
  if(intAI >= 716 && intAI < 723){
    return "NHRN";
  }
  if(intAI >= 90 && intAI <= 99){
    return "INTERNAL";
  }
  return title;
};