// Kat kuralı: orta kat ve teras aynı canlı müzik menüsü, ikisinde kahvaltı ve omlet yok
var LEMAR = (function(){
  var KATLAR = {
    bahce: {no:'Kat 1', sira:1, ad:'Bahçe', menu:'bahce', video:'kat1', alt:'Açık hava, kahvaltı ve mutfak', canli:false, haric:[]},
    orta:  {no:'Kat 2', sira:2, ad:'Orta Kat', menu:'teras', video:'kat2', alt:'Salon, sahne ve bar', canli:true, haric:['Kahvaltı','Omlet Çeşitleri']},
    teras: {no:'Kat 3', sira:3, ad:'Teras', menu:'teras', video:'kat3', alt:'Sahne, bar ve nargile', canli:true, haric:['Kahvaltı','Omlet Çeşitleri']}
  };
  function tr(s){ return String(s).toLocaleLowerCase('tr'); }
  // arama ve gruplama için: türkçe harfler sadeleşir, kofte = köfte, NARGILE = nargile
  function sade(s){ return tr(s).replace(/[çğıöşü]/g, function(c){ return 'cgiosu'['çğıöşü'.indexOf(c)]; }); }
  function kacis(s){ return String(s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  function baslikHal(s){ return s === s.toLocaleUpperCase('tr') ? s.charAt(0) + s.slice(1).replace(/I/g, 'i').toLocaleLowerCase('tr') : s; }
  // katın kategorileri; q verilirse ürün adı, içerik ya da kategori adında arar
  function kategoriler(kat, q){
    var k = KATLAR[kat], ara = sade((q || '').trim());
    return VERI[k.menu].filter(function(c){ return k.haric.indexOf(c.ad) < 0; }).map(function(c){
      return {id:c.id, ad:baslikHal(c.ad), foto:c.foto, urunler:c.urunler.filter(function(u){
        return !ara || sade(u.ad + ' ' + u.icerik + ' ' + c.ad).indexOf(ara) > -1;
      })};
    }).filter(function(c){ return c.urunler.length; });
  }
  function icerik(u){ return u.icerik ? u.icerik.replace(/,(?=\S)/g, ', ') : ''; }
  function meta(u){ return [u.kcal, u.alerjen && 'Alerjen: ' + u.alerjen.replace(/\s*,\s*/g, ', ')].filter(Boolean).join(', '); }
  return {KATLAR:KATLAR, kategoriler:kategoriler, kacis:kacis, icerik:icerik, meta:meta, sade:sade};
})();
