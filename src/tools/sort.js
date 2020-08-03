export default function (arr) {
    let letters = "*abcdefghjklmnopqrstwxyz".split('');
    let zh = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split('');
    let segs = [];
    let curr;
    letters.forEach(function(item,i){
        curr = {letter: item, data:[]};
        arr.forEach(function(item2){
        if((!zh[i-1] || zh[i-1].localeCompare(item2) <= 0) && item2.localeCompare(zh[i]) == -1) {
        curr.data.push(item2);
        }
        });
    if(curr.data.length) {
        segs.push(curr);
        curr.data.sort(function(a,b){
        return a.localeCompare(b);
        });
    }
    });
return segs;
}