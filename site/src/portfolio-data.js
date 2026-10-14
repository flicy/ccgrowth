export const productHref=(id,base='/')=>`${base}?project=${encodeURIComponent(id)}`;
export const findProduct=(items,id)=>items.find(item=>item.id===id)||null;
export function filterProducts(items,{query='',group='all'}={}){
 const term=query.trim().toLocaleLowerCase();
 return items.filter(item=>(group==='all'||item.group===group)&&(!term||JSON.stringify([item.title,item.description,item.audience,item.features]).toLocaleLowerCase().includes(term)));
}
