'use strict';

// From the CSV at: https://www.nationalnanpa.com/area_codes/index.html
// TODO: update regularly (once a year should be fine)
var valid_na_area_codes = [ '201','202','203','204','205','206','207','208',
'209','210','212','213','214','215','216','217','218','219','220','223','224',
'225','226','227','228','229','231','234','236','239','240','242','246','248',
'249','250','251','252','253','254','256','260','262','264','267','268','269',
'270','272','274','276','279','281','283','284','289','301','302','303','304',
'305','306','307','308','309','310','312','313','314','315','316','317','318',
'319','320','321','323','325','327','330','331','332','334','336','337','339',
'340','343','345','346','347','351','352','360','361','364','365','367','380',
'385','386','401','402','403','404','405','406','407','408','409','410','412',
'413','414','415','416','417','418','419','423','424','425','430','431','432',
'434','435','437','438','440','441','442','443','445','447','450','456','458',
'463','464','469','470','473','475','478','479','480','484','500','501','502',
'503','504','505','506','507','508','509','510','512','513','514','515','516',
'517','518','519','520','522','530','531','533','534','539','540','541','544',
'548','551','557','559','561','562','563','564','566','567','570','571','573',
'574','575','577','579','580','581','585','586','587','588','600','601','602',
'603','604','605','606','607','608','609','610','612','613','614','615','616',
'617','618','619','620','622','623','626','628','629','630','631','636','639',
'641','646','647','649','650','651','657','659','660','661','662','664','667',
'669','670','671','678','679','680','681','682','684','689','700','701','702',
'703','704','705','706','707','708','709','710','712','713','714','715','716',
'717','718','719','720','721','724','725','726','727','730','731','732','734',
'737','740','743','747','754','757','758','760','762','763','765','767','769',
'770','772','773','774','775','778','779','780','781','782','784','785','786',
'787','800','801','802','803','804','805','806','807','808','809','810','812',
'813','814','815','816','817','818','819','822','825','828','829','830','831',
'832','833','838','843','844','845','847','848','849','850','854','855','856',
'857','858','859','860','862','863','864','865','866','867','868','869','870',
'872','873','876','877','878','879','888','900','901','902','903','904','905',
'906','907','908','909','910','912','913','914','915','916','917','918','919',
'920','925','928','929','930','931','934','936','937','938','939','940','941',
'947','949','951','952','954','956','959','970','971','972','973','975','978',
'979','980','984','985','986','989' ];

/**
 * Fonz.js validates phone numbers. For now, it only works with North American
 * numbers, as international support is quite more involved. The main goal is
 * accuracy.
 *
 * TODO: international support
 */
module.exports = {
  /**
   * Validates whether or not an input is a valid North American phone number
   * according to the NANPA. We verify area codes, exchange codes, and station
   * codes. To do this verification, all non-numeric characters are stripped.
   * @param {string} phone - the phone number to test
   * @param {string} locale - unused
   * @return {boolean} - true if the number is valid, false otherwise
   */
  validate: function(phone, locale) {
    if (!phone) {
      return false;
    }
    phone = phone.toString();
    phone = phone.replace(/\D/g,'');
    
    // if size == 11, should always lead with a 1
    if (phone.length == 11) {
      if (phone[0] != '1') {
        return false;
      } else {
        phone = phone.substring(1);
      }
    }
    
    // size must be 10
    if (phone.length != 10) {
      return false;
    }
    
    // split it by parts
    var area_code = phone.substring(0,3);
    var exchange_code = phone.substring(3,6);
    var station_code = phone.substring(6,10);
    if (valid_na_area_codes.indexOf(area_code) < 0) {
      return false;
    }
      
    // exchange code sanity check: cannot end in two 1's
    if (exchange_code.substring(1) == '11') {
      return false;
    }
        
    // this is a funky exchange code
    if (exchange_code == '555') {
      // directory assistance and national use
      if (station_code == '1212' || station_code == '4334') {
        return false;
      }
      // fictitious numbers
      if (station_code[0] == '0') {
        var station_code_number = Number(station_code);
        if (station_code_number >= 100 && station_code_number <= 199) {
          return false;
        }
      }
    }
    
    // eeeeyy
    return true;
  }
};
