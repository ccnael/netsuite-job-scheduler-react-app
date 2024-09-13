(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const t of o.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&r(t)}).observe(document,{childList:!0,subtree:!0});function a(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(n){if(n.ep)return;n.ep=!0;const o=a(n);fetch(n.href,o)}})();const h=decodeURIComponent($("#suiteletUrl").val()),C=JSON.parse(decodeURIComponent($("#workOrders").val())),H=JSON.parse(decodeURIComponent($("#customers").val())),y=JSON.parse(decodeURIComponent($("#resources").val())),j=JSON.parse(decodeURIComponent($("#resourceGroups").val())),I=JSON.parse(decodeURIComponent($("#events").val()));function q(l){const e=$("#leftSidebar .collapsible-list .person-container"),a=$("#leftSidebar select.multiple-resource-field"),r=$("#leftSidebar select.multiple-resource-group-field"),n=$("#leftSidebar select.multiple-status-field"),o={resources:[],resourceGroups:[],status:[]};let t={};a.length&&a.on("change",function(){o.resources=$(this).val()||[],c()}),r.length&&r.on("change",function(){o.resourceGroups=$(this).val()||[],c()}),n.length&&n.on("change",function(){o.status=$(this).val()||[],c()});function c(){t={},e.each(function(){const i=$(this),p=i[0].id,d=l.all.find(v=>v.employee.value==p);if(d){const v=d.resourceGroup.value,b=d.active?"1":"0",g=!!((!o.resources.length||o.resources.includes(p))&&(!o.resourceGroups.length||o.resourceGroups.includes(v))&&(!o.status.length||o.status.includes(b)));i.toggle(g);const m=i.closest('div[id*="-filter-tableWrapper"]').attr("id").match(/\d+/)[0];t[m]||(t[m]=0),g&&t[m]++}}),s()}function s(){$.each(t,(p,d)=>{console.log(p,d),$(`#leftSidebar #resourceGroup-${p}-filter-tableWrapper span.counter`).html(d)});const i=e.filter(function(){return $(this).css("display")!=="none"}).length;$("#leftSidebar .card-header span.counter").html(i)}}function V(l){const e=$("#secondColumn .card-wrapper .card-item"),a=$("#secondColumn input#job-datefrom"),r=$("#secondColumn input#job-dateto"),n=$("#secondColumn select.multiple-customer-field"),o=$("#secondColumn input#woTitle"),t={dateFrom:"",dateTo:"",customers:[],woTitle:""};a.length&&a.on("change",function(){t.dateFrom=$(this).val()||[],c()}),r.length&&r.on("change",function(){t.dateTo=$(this).val()||[],c()}),n.length&&n.on("change",function(){t.customers=$(this).val()||[],c()}),o.length&&o.on("keyup",function(){t.woTitle=$(this).val(),c()});function c(){e.each(function(){const i=$(this),p=i[0].id,d=l.find(v=>v.id==p);if(d){let v=d.date;const b=d.customer.value,g=d.title,u=new RegExp(t.woTitle,"gi");let m=!1;v&&(v=moment(v),t.dateFrom=t.dateFrom?moment(t.dateFrom):"",t.dateTo=t.dateTo?moment(t.dateTo):"",t.dateFrom&&t.dateTo?m=v.isBetween(t.dateFrom,t.dateTo,null,"[]"):t.dateFrom&&!t.dateTo?m=v.isSameOrAfter(t.dateFrom):!t.dateFrom&&t.dateTo&&(m=v.isSameOrBefore(t.dateTo))),!t.dateFrom&&!t.dateTo&&(m=!0);const O=!!(m&&(!t.customers.length||t.customers.includes(b))&&g.match(u));i.toggle(O)}}),s()}function s(){const i=e.filter(function(){return $(this).css("display")!=="none"}).length;$("#secondColumn .card-header span.counter").html(i)}}function U(l){const e=$("#thirdColumn .card-wrapper .card-item"),a=$("#thirdColumn input#event-datefrom"),r=$("#thirdColumn input#event-dateto"),n=$("#thirdColumn select.multiple-resource-field"),o=$("#thirdColumn select.multiple-resource-group-field"),t=$("#thirdColumn select.multiple-event-status-field"),c=$("#thirdColumn select.multiple-event-priority-field"),s={dateFrom:"",dateTo:"",resources:[],resourceGroups:[],status:[],priority:[]};a.length&&a.on("change",function(){s.dateFrom=$(this).val()||[],i()}),r.length&&r.on("change",function(){s.dateTo=$(this).val()||[],i()}),n.length&&n.on("change",function(){s.resources=$(this).val()||[],i()}),o.length&&o.on("change",function(){s.resourceGroups=$(this).val()||[],i()}),t.length&&t.on("change",function(){s.status=$(this).val()||[],i()}),c.length&&c.on("change",function(){s.priority=$(this).val()||[],i()});function i(){e.each(function(){const d=$(this),v=d[0].id,b=l.find(g=>g.id==v);if(b){let g=b.date.end||b.date.start;const u=b.resources.map(x=>x.employee.value),m=b.resources.map(x=>x.resourceGroup.value),O=b.status.value,B=b.priority.value;let w=!1;g&&(g=moment(g),s.dateFrom=s.dateFrom?moment(s.dateFrom):"",s.dateTo=s.dateTo?moment(s.dateTo):"",s.dateFrom&&s.dateTo?w=g.isBetween(s.dateFrom,s.dateTo,null,"[]"):s.dateFrom&&!s.dateTo?w=g.isSameOrAfter(s.dateFrom):!s.dateFrom&&s.dateTo&&(w=g.isSameOrBefore(s.dateTo))),!s.dateFrom&&!s.dateTo&&(w=!0);const L=!!(w&&(!s.resources.length||s.resources.some(x=>new Set(u).has(x)))&&(!s.resourceGroups.length||s.resourceGroups.some(x=>new Set(m).has(x)))&&(!s.status.length||s.status.includes(O))&&(!s.priority.length||s.priority.includes(B)));d.toggle(L)}}),p()}function p(){const d=e.filter(function(){return $(this).css("display")!=="none"}).length;$("#thirdColumn .card-header span.counter").html(d)}}const _=[{className:"dt-head-center dr-body-center",title:`<div class="form-group form-check container d-flex justify-content-center">
        <input type="checkbox" class="form-check-input" style="left: 30px" onclick="markAll(event);">
      </div>`,render:(l,e,a,r)=>`<div class="form-group form-check container d-flex justify-content-center">
        <input recordId="${a.employee.value}" type="checkbox" class="form-check-input dt-line-select" ${a.selected?"checked":""}>
      </div>`,width:"5%",orderable:!1},{className:"dt-head-center",data:"employee.text",title:"Name"},{className:"dt-head-center",data:"type.text",title:"Type"},{className:"dt-head-center",data:"resourceGroup.text",title:"Group"},{className:"dt-head-center",data:"email",title:"Email"},{className:"dt-head-center",data:"phone",title:"Phone"}],W=[{className:"dt-head-center dr-body-center",title:`<div class="form-group form-check container d-flex justify-content-center">
        <input type="checkbox" class="form-check-input" style="left: 30px" onclick="markAll(event);">
      </div>`,render:(l,e,a,r)=>`<div class="form-group form-check container d-flex justify-content-center">
        <input recordId="${a.id}" type="checkbox" class="form-check-input dt-line-select" ${a.selected?"checked":""}>
      </div>`,width:"5%",orderable:!1},{className:"dt-head-center dt-body-center",data:"line",title:"Line #"},{className:"dt-head-center",data:"item.text",title:"Item"},{className:"dt-head-center",data:"description",title:"Description"},{className:"dt-head-center dt-body-center",data:"quantity",title:"Quantity"}],G=[{className:"dt-head-center dr-body-center",title:"",render:(l,e,a,r)=>`<div class="form-group form-check container d-flex justify-content-center">
        <input recordId="${a.id}" type="radio" class="form-check-input dt-line-select" style="left: 30px" name='woContact' ${a.primary}>
      </div>
      `,width:"5%",orderable:!1},{className:"dt-head-center dt-body-center",data:"name",title:"Name"},{className:"dt-head-center",data:"email",title:"Email"},{className:"dt-head-center",data:"jobTitle",title:"Job Title"},{className:"dt-head-center dt-body-center",data:"phone",title:"Phone #"},{className:"dt-head-center dt-body-center",data:"mobilePhone",title:"Mobile #"}],K=[{className:"dt-head-center dr-body-center",title:"",render:(l,e,a,r)=>`<div class="form-group form-check container d-flex justify-content-center">
         <input recordId="${a.id}" type="radio" class="form-check-input dt-line-select" style="left: 30px" name='woAddress' checked>
      </div>
      `,width:"5%",orderable:!1},{className:"dt-head-center dt-body-center",data:"customer.text",title:"Customer"},{className:"dt-head-center",data:"address.text",title:"Address"},{className:"dt-head-center",data:"addressDetails",title:"Full Address"}],J=[{className:"dt-head-center resourceName",render:(l,e,a,r)=>`<p recordId="${a.employee.value}" locationId="${a.location.value}">${a.employee.text}</p>`,title:"Name"},{className:"dt-head-center",render:(l,e,a,r)=>'<input type="time" class="form-control starttime" required>',title:"Start Time"},{className:"dt-head-center",render:()=>'<input type="time" class="form-control endtime" required>',title:"End Time"},{className:"dt-head-center",render:()=>`
      <div class="ts-input-container">
        <input type="number" placeholder="hrs" class="away-hrs" min="0" max="12" />
        <input type="number" placeholder="min" class="away-mins" min="0" max="60" />
      </div>
    `,title:"Away"},{className:"dt-head-center",render:()=>`
      <div class="ts-input-container">
        <input type="number" placeholder="hrs" class="reg-hrs" min="0" max="12" />
        <input type="number" placeholder="min" class="reg-mins" min="0" max="60" />
      </div>
    `,title:"Reg"},{className:"dt-head-center",render:()=>`
      <div class="ts-input-container">
        <input type="number" placeholder="hrs" class="ot-hrs" min="0" max="12" />
        <input type="number" placeholder="min" class="ot-mins" min="0" max="60" />
      </div>
    `,title:"OT"},{className:"dt-head-center",render:()=>`
      <div class="ts-input-container">
        <input type="number" placeholder="hrs" class="dt-hrs" min="0" max="12" />
        <input type="number" placeholder="min" class="dt-mins" min="0" max="60" />
      </div>
    `,title:"DT"},{className:"dt-head-center",render:()=>'<input type="text" class="form-control note">',title:"Note"}],Z=[{className:"dt-head-center dr-body-center",title:`<div class="form-group form-check container d-flex justify-content-center">
        <input type="checkbox" class="form-check-input" style="left: 30px" onclick="markAll(event);">
      </div>`,render:(l,e,a,r)=>`<div class="form-group form-check container d-flex justify-content-center">
        <input recordId="${a.id}" type="checkbox" class="form-check-input dt-line-select" ${a.selected?"checked":""}>
      </div>`,width:"5%",orderable:!1},{className:"dt-head-center dt-body-center lineId",data:"line",title:"Line #"},{className:"dt-head-center",data:"item.text",title:"Item"},{className:"dt-head-center",data:"description",title:"Description"},{className:"dt-head-center dt-body-center itemQty",data:"quantity",title:"Quantity"},{className:"dt-head-center dt-body-center",render:(l,e,a,r)=>`<input type="number" class="completeQty" value="${a.quantity}" required />`,title:"Complete Qty"}],z=[{className:"dt-head-center dt-body-left",data:"status.text",title:"Status"},{className:"dt-head-center",data:"reason",title:"Reason"},{className:"dt-head-center",data:"description",title:"Description"},{className:"dt-head-center",data:"resolution",title:"Resolution"},{className:"dt-head-center dt-body-center",data:"dateCreated",title:"Date Created"},{className:"dt-head-center dt-body-center",data:"enteredBy",title:"Entered By"}];let S,k,E,R,F,D,A;class T{static showBanners(){setTimeout(()=>{[{text:"In Progress",duration:99999,close:!0,gravity:"top",position:"right",style:{background:"linear-gradient(to right, #00b09b, #96c93d)"}},{text:"Drag Available Jobs to Events Column",duration:99999,close:!0,gravity:"top",position:"center",style:{background:"linear-gradient(to right, #00b09b, #96c93d)"}}].map(a=>Toastify(a).showToast())},250)}static initLayoutHandlers(){const e=document.getElementById("leftSidebar"),r=document.querySelector(".grid-container").getBoundingClientRect().width*.2,n=document.getElementById("columnResizer"),o=document.getElementById("secondColumn"),t=document.getElementById("thirdColumn"),c=document.getElementById("toggleLeft"),s=document.getElementById("collapseLeft");s.style.display="block",e.style.width="18%",c.addEventListener("click",b=>{s.style.display==="none"||s.style.display===""?(s.style.display="block",e.style.width="18%",c.classList.remove("fa-square-caret-right"),c.classList.add("fa-square-caret-left")):(s.style.display="none",e.style.width="0",c.classList.remove("fa-square-caret-left"),c.classList.add("fa-square-caret-right")),o.style.width="",t.style.width=""});let i,p,d;n.addEventListener("mousedown",b=>{i=b.clientX,p=o.getBoundingClientRect().width,d=t.getBoundingClientRect().width,document.addEventListener("mousemove",v),document.addEventListener("mouseup",()=>{document.removeEventListener("mousemove",v)})});function v(b){const g=b.clientX-i,u=p+g,m=d-g;u>r&&m>r&&(o.style.width=`${u}px`,t.style.width=`${m}px`)}q(y),V(C),U(I)}static holdWorkOrder(e){e.preventDefault();const a=e.target.closest(".card-item").id;Swal.fire({didOpen:()=>{Swal.showLoading(),fetch(`${h}&mode=holdWorkOrder&woId=${a}`,{method:"GET",headers:{"Content-Type":"application/json"}}).then(r=>r.json()).then(r=>{Swal.fire({title:"Success!",text:"Work Order Status has been set to Hold",icon:"success"}),Swal.hideLoading(),window.location.reload()}).catch(r=>{Swal.fire("Unexpected Error",r.message,"error"),Swal.hideLoading()})},allowOutsideClick:!1,allowEscapeKey:!1,text:"Updating Work Order Status to Hold"})}static cancelWorkOrder(e){e.preventDefault();const a=e.target.closest(".card-item").id;Swal.fire({didOpen:()=>{Swal.showLoading(),fetch(`${h}&mode=cancelWorkOrder&woId=${a}`,{method:"GET",headers:{"Content-Type":"application/json"}}).then(r=>r.json()).then(r=>{Swal.fire({title:"Success!",text:"Work Order Status has been set to Closed",icon:"success"}),Swal.hideLoading(),window.location.reload()}).catch(r=>{Swal.fire("Unexpected Error",r.message,"error"),Swal.hideLoading()})},allowOutsideClick:!1,allowEscapeKey:!1,text:"Updating Work Order Status to Closed"})}static printWorkOrder(e){e.preventDefault();const a=e.target.closest(".card-item").id;console.log("printWorkOrder",`${h}&mode=printWorkOrder&woId=${a}`),window.open(`${h}&mode=printWorkOrder&woId=${a}`)}static printPickList(e){e.preventDefault();const a=e.target.closest(".card-item").id;window.open(`${h}&mode=printPickList&woId=${a}`)}}class f{static MainForm(){return{initialize:()=>{$("#eventModal .alldayevent-switch").on("change",e=>{e.target.checked?($("#eventModal .starttime").val("08:00"),$("#eventModal .endtime").val("18:00"),$("#eventModal .starttime").prop("disabled",!0),$("#eventModal .endtime").prop("disabled",!0)):($("#eventModal .starttime").prop("disabled",!1),$("#eventModal .endtime").prop("disabled",!1))}),$("#eventModal").on("shown.bs.modal",e=>{setTimeout(()=>{M("eventModal");const a=$("#eventModal").attr("mode"),r=$("#eventModal").attr("woId"),n=$("#eventModal").attr("eventId");let o,t,c,s,i;a=="create"?(c="Create New Event",o=C.find(p=>p.id==r),s=o==null?void 0:o.title,i=y.all):a=="edit"&&(c="Update Event Details",t=I.find(p=>p.id==n),o=t.woRef,s=t==null?void 0:t.title,i=JSON.parse(JSON.stringify(y.all)),i=i.map(p=>(p.selected=!!t.resources.find(d=>p.employee.value==d.employee.value),p))),console.log("***** Work Order Data *****",{woId:r,eventId:n},{woRef:o,eventData:t}),o&&($("#eventModal .modal-title").text(c),$("#eventModal input.eventTitleInput").val(s),$("#eventModal .title p").html(`<a href="${o.woUrl}" target="_blank">${o.title}</a>`),$("#eventModal .project p").html(`<a href="${o.projectUrl}" target="_blank">${o.project.text}</a>`),a=="edit"&&t&&($("#eventModal").attr("woId",t.workorder.value),$("#eventModal").attr("eventDataSrc",encodeURIComponent(JSON.stringify(t))),$("#eventModal .datefrom").val(t.date.start),$("#eventModal .dateto").val(t.date.end),$("#eventModal .starttime").val(t.time.start),$("#eventModal .endtime").val(t.time.end),$("#eventModal .note").val(t.note),$("#eventModal .status").val(t.status.value),$("#eventModal .priority").val(t.priority.value)),$.fn.dataTable.ext.errMode="none",S=$("#woResources_dt").DataTable({processing:!0,retrieve:!0,ajax(p,d,v){d({data:i})},columns:_,initComplete:()=>{f._eventFormHandlers()}}),k=$("#woItems_dt").DataTable({processing:!0,retrieve:!0,ajax(p,d,v){d({data:a=="create"?o.items:(t==null?void 0:t.items)||[]})},columns:W,initComplete:()=>{f._eventFormHandlers()}}),E=$("#contacts").DataTable({processing:!0,retrieve:!0,searching:!1,paging:!1,info:!1,ajax(p,d,v){d({data:a=="create"?o.contacts:(t==null?void 0:t.contacts)||[]})},columns:G}),R=$("#addresses").DataTable({processing:!0,retrieve:!0,searching:!1,paging:!1,info:!1,ajax(p,d,v){d({data:a=="create"?o.addresses:(t==null?void 0:t.addresses)||[]})},columns:K}))},250)}),$("#eventSubmitForm").on("submit",e=>{e.preventDefault();const a=$("#eventModal").attr("mode"),r=$("#eventModal").attr("woId"),n=$("#eventModal").attr("eventId"),o=C.find(u=>u.id==r),t={eventDataSrc:{},woRef:o,eventData:{}};t.eventData.title=$("#eventModal input.eventTitleInput").val(),t.eventData.date={start:$("#eventModal .datefrom").val(),end:$("#eventModal .dateto").val()},t.eventData.time={start:$("#eventModal .starttime").val(),end:$("#eventModal .endtime").val()},t.eventData.note=$("#eventModal .note").val(),t.eventData.status=$("#eventModal .status").val(),t.eventData.priority=$("#eventModal .priority").val(),t.eventData.selectedResources=[],t.eventData.selectedItems=[],t.eventData.selectedContact={},t.eventData.selectedAddress={};const c=[],s=document.querySelectorAll("#woResources_dt tbody .dt-line-select");for(const u of s)if(u.checked){const m=u.getAttribute("recordid");m&&c.push(m)}const i=[],p=document.querySelectorAll("#woItems_dt tbody .dt-line-select");for(const u of p)if(u.checked){const m=u.getAttribute("recordid");m&&i.push(m)}let d="";const v=document.querySelectorAll('#contacts tbody input[name="woContact"]');for(const u of v)if(u.checked){const m=u.getAttribute("recordid");if(m){d=m;break}}let b="";const g=document.querySelectorAll('#addresses tbody input[name="woAddress"]');for(const u of g)if(u.checked){const m=u.getAttribute("recordid");if(m){b=m;break}}t.eventData.selectedResources=y.active.filter(u=>!!c.includes(u.employee.value)),t.eventData.selectedItems=o.items.filter(u=>!!i.includes(u.id)),t.eventData.selectedContact=o.contacts.find(u=>u.id==d)||{},t.eventData.selectedAddress=o.addresses.find(u=>u.id==b)||{},t.eventData.contacts=o.contacts,t.eventData.addresses=o.addresses,a=="create"?f._createEventRecord(t,"eventModal"):a=="edit"&&(t.eventData.id=n,t.eventDataSrc=JSON.parse(decodeURIComponent($("#eventModal").attr("eventDataSrc"))),f._updateEventRecord(t))}),$("#eventModal").on("hidden.bs.modal",e=>f._clearFieldValues("eventModal"))}}}static GeneralEventForm(){return{initialize:()=>{$("#generalEventModal .alldayevent-switch").on("change",e=>{e.target.checked?($("#generalEventModal .starttime").val("08:00"),$("#generalEventModal .endtime").val("18:00"),$("#generalEventModal .starttime").prop("disabled",!0),$("#generalEventModal .endtime").prop("disabled",!0)):($("#generalEventModal .starttime").prop("disabled",!1),$("#generalEventModal .endtime").prop("disabled",!1))}),$("#generalEventModal").on("shown.bs.modal",e=>{setTimeout(()=>{M("generalEventModal"),S=$("#woResources_dt_ge").DataTable({processing:!0,retrieve:!0,ajax(a,r,n){r({data:y.active})},columns:_,initComplete:()=>{f._eventFormHandlers()}})},250)}),$("#generalEventSubmitForm").on("submit",e=>{e.preventDefault();const a={eventData:{},woRef:{}};a.eventData.title=$("#generalEventModal input.eventTitle").val(),a.eventData.date={start:$("#generalEventModal .datefrom").val(),end:$("#generalEventModal .dateto").val()},a.eventData.time={start:$("#generalEventModal .starttime").val(),end:$("#generalEventModal .endtime").val()},a.eventData.note=$("#generalEventModal .note").val(),a.eventData.allDay=$("#generalEventModal .alldayevent-switch")[0].checked,a.eventData.status=$("#generalEventModal .status").val(),a.eventData.priority=$("#generalEventModal .priority").val(),a.eventData.selectedResources=[],a.eventData.selectedItems=[],a.eventData.selectedContact={},a.eventData.selectedAddress={};const r=[],n=document.querySelectorAll("#woResources_dt_ge tbody .dt-line-select");for(const o of n)if(o.checked){const t=o.getAttribute("recordid");t&&r.push(t)}a.eventData.selectedResources=y.active.filter(o=>!!r.includes(o.employee.value)),f._createEventRecord(a,"generalEventModal")}),$("#generalEventModal").on("hidden.bs.modal",e=>f._clearFieldValues("generalEventModal"))}}}static CompleteEventForm(){return{initialize:()=>{$("#completeEventModal").on("shown.bs.modal",e=>{const a=$("#completeEventModal").attr("eventId"),r=I.find(t=>t.id==a),n=r.woRef,o=n.id;$("#completeEventModal").attr("woId",o),$("#completeEventModal").attr("eventDataSrc",encodeURIComponent(JSON.stringify(r))),$("#completeEventModal .eventTitle p").html(`<a href="${r.url}" target="_blank">${r.title}</a>`),$("#completeEventModal .title p").html(`<a href="${n.woUrl}" target="_blank">${n.title}</a>`),$("#completeEventModal .project p").html(`<a href="${n.projectUrl}" target="_blank">${n.project.text}</a>`),$("#completeEventModal .status p").text(r.status.text),F=$("#timeSheets_dt").DataTable({processing:!0,retrieve:!0,info:!1,ajax(t,c,s){c({data:r.resources})},columns:J}),D=$("#woItems_dt_ce").DataTable({processing:!0,retrieve:!0,info:!1,ajax(t,c,s){c({data:r.items})},columns:Z,initComplete:()=>{f._eventFormHandlers()}}),fetch(`${h}&mode=getOrderPunchList&woId=${o}`,{method:"GET",headers:{"Content-Type":"application/json"}}).then(t=>t.json()).then(t=>{$("#completeEventModal").attr("punchLines",encodeURIComponent(JSON.stringify(t))),A=$("#punchItems_dt").DataTable({processing:!0,retrieve:!0,searching:!1,paging:!1,info:!1,ajax(c,s,i){s({data:t})},columns:z,initComplete:()=>{f._completeEventFormHandlers(),M("completeEventModal")}})}).catch(t=>{Swal.fire("Unexpected Error",t.message,"error"),M("completeEventModal")})}),$("#completeEventSubmitForm").on("submit",e=>{e.preventDefault();const a={eventDataSrc:{},timeSheets:[],fulfillItems:[]};a.eventDataSrc=JSON.parse(decodeURIComponent($("#completeEventModal").attr("eventDataSrc")));const r=JSON.parse(decodeURIComponent($("#completeEventModal").attr("punchLines"))),n=a.eventDataSrc.id;$("#timeSheets_dt tbody > tr").each(function(){a.timeSheets.push({id:$(this).find(".resourceName p").attr("recordId"),location:$(this).find(".resourceName p").attr("locationId"),startTime:$(this).find(".starttime").val(),endTime:$(this).find(".endtime").val(),awayHrs:$(this).find(".away-hrs").val(),awayMins:$(this).find(".away-mins").val(),otHrs:$(this).find(".ot-hrs").val(),otMins:$(this).find(".ot-mins").val(),dtHrs:$(this).find(".dt-hrs").val(),dtMins:$(this).find(".dt-mins").val(),notes:$(this).find(".note").val()})}),$("#woItems_dt_ce tbody > tr").each(function(){const o=$(this).find(".dt-line-select").attr("recordId"),t=$(this).find(".dt-line-select")[0].checked,c=$(this).find(".lineId").text(),s=+$(this).find(".itemQty").text(),i=+$(this).find(".completeQty").val();t&&a.fulfillItems.push({customRecordId:o,lineId:c,quantity:s,completeQty:i})}),console.log("payload",a),r.length,Swal.fire({title:"Complete Event?",text:`This will fulfill order items for Event ID ${n}`,icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#817c7c",confirmButtonText:"Yes"}).then(o=>{o.isConfirmed&&Swal.fire({didOpen:()=>{Swal.showLoading(),fetch(`${h}&mode=completeEvent`,{method:"POST",body:JSON.stringify(a),headers:{"Content-Type":"application/json"}}).then(t=>t.json()).then(t=>{t.code==200?Swal.fire({title:"Success!",text:`Event ID ${n} Completed`,icon:"success"}).then(()=>{window.location.reload()}):Swal.fire({title:"Unexpected Error",text:`Error: ${t.errorMsg}`,icon:"error"}),Swal.hideLoading()}).catch(t=>{Swal.fire("Unexpected Error",t.message,"error"),Swal.hideLoading()})},allowOutsideClick:!1,allowEscapeKey:!1,text:`Completing Event ID ${n}...`})})}),$("#completeEventModal").on("hidden.bs.modal",e=>f._clearFieldValues("completeEventModal"))}}}static _eventFormHandlers(){window.markAll=e=>{const a=e.target.checked,r=e.target.closest(".dataTable").querySelectorAll(".dt-line-select");for(let n=0;n<r.length;n++){r[n].type=="checkbox"&&(r[n].checked=a);//!el[i].checked;
}},window.validateForm=()=>!0}static _completeEventFormHandlers(){window.completeAll=()=>{$("#woItems_dt_ce tbody > tr").each(function(){const e=+$(this).find(".itemQty").text();+$(this).find(".completeQty").val(e)})},window.clearAll=()=>{$("#woItems_dt_ce tbody > tr").each(function(){+$(this).find(".completeQty").val(0)})}}static _clearFieldValues(e){console.log("***** Clearing Fields *****",e),Y(e),e.match(/eventModal|generalEventModal/g)&&($(`#${e}`).attr("mode",""),$(`#${e}`).attr("woId",""),$(`#${e}`).attr("eventId",""),$(`#${e}`).attr("eventDataSrc",""),$(`#${e} .datefrom`).val(""),$(`#${e} .dateto`).val(""),$(`#${e} .starttime`).val(""),$(`#${e} .endtime`).val(""),$(`#${e} .note`).val(""),document.querySelector(`#${e} .priority`).value="1",document.querySelector(`#${e} .status`).value="TENTATIVE",$(`#${e} .alldayevent-switch`)[0].checked=!1,S&&(e=="eventForm"?$("table#woResources_dt tbody").children().remove():e=="generalEventForm"&&$("table#woResources_dt_ge tbody").children().remove(),S=S.destroy()),k&&(e=="eventModal"&&$("table#woItems_dt tbody").children().remove(),k=k.destroy()),e=="eventModal"&&(E&&($("table#contacts tbody").children().remove(),E=E.destroy()),R&&($("table#addresses tbody").children().remove(),R=R.destroy()))),e=="completeEventModal"&&($(`#${e}`).attr("eventId",""),$(`#${e}`).attr("woId",""),$(`#${e}`).attr("eventDataSrc",""),$(`#${e}`).attr("punchLines",""),$(`#${e} eventTitle p`).html(""),$(`#${e} title p`).html(""),$(`#${e} project p`).html(""),$(`#${e} status p`).html(""),F&&($("table#timeSheets_dt tbody").children().remove(),F=F.destroy()),D&&($("table#woItems_dt_ce tbody").children().remove(),D=D.destroy()),A&&($("table#punchItems_dt tbody").children().remove(),A=A.destroy()))}static _createEventRecord(e,a){var r;console.log("***** _createEventRecord() -> PAYLOAD *****",e),Swal.fire({title:"Create Event Record?",text:(r=e.woRef)!=null&&r.name?`Create Event for Work Order : ${e.woRef.name}`:"Create Event",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#817c7c",confirmButtonText:"Yes"}).then(n=>{n.isConfirmed&&Swal.fire({didOpen:()=>{Swal.showLoading(),fetch(`${h}&mode=createEventRecord`,{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then(o=>o.json()).then(o=>{o.code==200?Swal.fire({title:"Success!",text:`New Event Record ID ${o.recordId} has been created`,icon:"success"}).then(()=>{$(`#${a}`).modal("hide"),window.location.reload()}):Swal.fire({title:"Unexpected Error",text:`Error: ${o.errorMsg}`,icon:"error"}),Swal.hideLoading()}).catch(o=>{Swal.fire("Unexpected Error",o.message,"error"),Swal.hideLoading()})},allowOutsideClick:!1,allowEscapeKey:!1,text:"Creating Event Record..."})})}static _updateEventRecord(e){console.log("***** _updateEventRecord() -> PAYLOAD *****",e),Swal.fire({title:"Update Event Record?",text:`Event Record ID ${e.eventData.id}`,icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#817c7c",confirmButtonText:"Yes"}).then(a=>{a.isConfirmed&&Swal.fire({didOpen:()=>{Swal.showLoading(),fetch(`${h}&mode=updateEventRecord`,{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then(r=>r.json()).then(r=>{r.code==200?Swal.fire({title:"Success!",text:`Event Record ID ${e.eventData.id} has been updated`,icon:"success"}).then(()=>{$("#eventModal").modal("hide"),window.location.reload()}):Swal.fire({title:"Unexpected Error",text:`Error: ${r.errorMsg}`,icon:"error"}),Swal.hideLoading()}).catch(r=>{Swal.fire("Unexpected Error",r.message,"error"),Swal.hideLoading()})},allowOutsideClick:!1,allowEscapeKey:!1,text:`Updating Event Record ID ${e.eventData.id}...`})})}static deleteEventRecord(e){const a=e.target.closest(".card-item").getAttribute("id");console.log("deleteEventRecord() > Event ID",a),Swal.fire({title:`Delete Event Record ID ${a}?`,text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#817c7c",confirmButtonText:"Yes"}).then(r=>{r.isConfirmed&&Swal.fire({didOpen:()=>{Swal.showLoading(),fetch(`${h}&mode=deleteEventRecord&id=${a}`,{method:"GET",headers:{"Content-Type":"application/json"}}).then(n=>n.json()).then(n=>{Swal.fire({title:"Deleted!",text:`Event Record ID ${a} has been deleted`,icon:"success"}).then(()=>{window.location.reload()}),Swal.hideLoading()}).catch(n=>{Swal.fire("Unexpected Error",n.message,"error"),Swal.hideLoading()})},allowOutsideClick:!1,allowEscapeKey:!0,text:`Deleting Event Record ID ${a}...`})})}}const Y=l=>{$(`#${l} .spinner`).show(),$(`#${l} .modal-body`).css("z-index","-1")},M=l=>{$(`#${l} .spinner`).hide(),$(`#${l} .modal-body`).css("z-index","1")},Q=y.all.length,N=y.all.map(l=>`<option value="${l.employee.value}">${l.employee.text}</option>`),P=j.map(l=>`<option value="${l.value}">${l.text}</option>`);document.querySelector("#app").innerHTML=`
  <div id="container">
    <header class="header">
      <ul class="nav nav-tabs" id="section-tab" role="tablist">
        <li class="nav-item">
            <a class="nav-link active" id="board-tab" data-toggle="tab" href="#boardSection" role="tab" aria-controls="boardSection" aria-selected="true">Board</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="calendar-tab" data-toggle="tab" href="#calendarSection" role="tab" aria-controls="calendarSection" aria-selected="false">Calendar</a>
        </li>
      </ul>
    </header>
    <div class="tab-content" id="tabSections">
      <div class="tab-pane fade show active" role="tabpanel" aria-labelledby="home-tab" id="boardSection">
        <div class="main-container">
          <!-- Collapsible First Column -->
          <aside class="sidebar" id="leftSidebar">
            <div class="collapse-content" id="collapseLeft">
              <div style="padding: 10px" class="card-header header">
                <i class="fa-solid fa-icon-size fa-users-gear" style="font-size: 14px; margin-right: 5px"></i>
                <span style="display: inline-block;"><h5><strong>Resources</strong></h5></span>
                <span class="badge badge-danger badge-pill counter">${Q}</span>
              </div>
              <div id="col1-filter-tableWrapper" class="accordion accordion-flush">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="col1-filter-tableHeading">
                    <button class="accordion-button" type="button" data-toggle="collapse" data-target="#col1-filter-table" aria-expanded="true" aria-controls="col1-filter-table">
                      <i class="fa fa-filter"></i>
                      <strong class="grid-header">&nbsp;Filters</strong>
                    </button>
                  </h2>
                  <div id="col1-filter-table" class="accordion-collapse collapse show" aria-labelledby="col1-filter-tableHeading" data-parent="#col1-filter-tableWrapper">
                    <div class="input-group" style=" margin-top: 10px;">
                      <div class="input-group mb-3" style="border-radius: 5px 5px 0 0;">
                        <select class="selectpicker mx-auto multiple-resource-field" title="Filter by Name" id="" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
                          ${N}
                        </select>
                      </div>
                      <div class="input-group mb-3">
                        <select class="selectpicker mx-auto multiple-resource-group-field" title="Filter by Group" id="" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
                        ${P}
                        </select>
                      </div>
                      <div class="input-group mb-3">
                        <select class="selectpicker mx-auto multiple-status-field" title="Filter by Status" id="" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
                          <option value="1">Available</option>
                          <option value="0">Unavailable</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="collapsible-list overflow-auto" style="height: 100%; overflow: scroll">
              ${j.map(l=>`
                <div id="resourceGroup-${l.value}-filter-tableWrapper" class="accordion accordion-flush">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="resourceGroup-${l.value}-filter-tableHeading">
                      <button class="accordion-button" type="button" data-toggle="collapse" data-target="#resourceGroup-${l.value}-filter-table" aria-expanded="true" aria-controls="resourceGroup-${l.value}-filter-table">
                        <i class="fa-solid fa-icon-size fa-user-group"></i>
                        <strong class="grid-header">&nbsp;${l.text}&nbsp;</strong>
                        <span class="badge badge-danger badge-pill counter">${l.resourceCount}</span>
                      </button>
                    </h2>
                    <div id="resourceGroup-${l.value}-filter-table" class="accordion-collapse collapse show" aria-labelledby="resourceGroup-${l.value}-filter-tableHeading" data-parent="#resourceGroup-${l.value}-filter-tableWrapper">
                      ${l.resources.map(e=>`
                      <div class="person-container" id="${e.employee.value}">
                        <div class="person-circle">
                            <span class="initials">${e.initials}</span>
                            ${e.active?'<span class="status active"></span>':'<span class="status busy"></span>'}
                        </div>
                        <div class="person-info">
                            <span class="full-name">${e.employee.text}</span>
                            ${e.active?'<span class="status-text">Available</span>':'<span class="status-text">Not Available</span>'}
                        </div>
                      </div>`)}
                    </div>
                  </div>
                </div>`)}
            </div>
          </aside>
          <div class="collapse-btn">
            <i id="toggleLeft" class="fa-solid fa-square-caret-left"></i>
          </div>
          <div class="grid-container">
            <!-- Resizable Second Column -->
            <div class="column resizable" id="secondColumn">
              <div class="content">
                <div class="card-header header">
                  <div style="text-align: center;">
                    <i class="fa-solid fa-screwdriver-wrench" style="font-size: 16px"></i>
                    <span style="display: inline-block; margin-left: 5px"><h5><strong>Available Jobs</strong></h5></span>&nbsp;
                    <span class="badge badge-danger badge-pill counter">${C.length}</span>
                  </div>
                </div>
                <div id="col2-filter-tableWrapper" class="accordion accordion-flush">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="col2-filter-tableHeading">
                      <button class="accordion-button collapsed" type="button" data-toggle="collapse" data-target="#col2-filter-table" aria-expanded="false" aria-controls="col2-filter-table">
                        <i class="fa fa-filter"></i>
                        <strong class="grid-header">&nbsp;Filters</strong>
                      </button>
                    </h2>
                    <div id="col2-filter-table" class="accordion-collapse collapse" aria-labelledby="col2-filter-tableHeading" data-parent="#col2-filter-tableWrapper">
                      <div class="input-group inline-inputs" style="margin-top: 10px; margin-left: 10px;">
                        <div class="mb-3 row align-items-center">
                          <label for="job-datefrom" class="col-form-label col-auto">From: </label>
                          <div class="col-auto">
                              <input type="date" class="form-control" id="job-datefrom">
                          </div>
                        </div>
                        <div class="mb-3 row align-items-center">
                          <label for="job-dateto" class="col-form-label col-auto">To: </label>
                          <div class="col-auto">
                              <input type="date" class="form-control" id="job-dateto">
                          </div>
                        </div>
                      </div>
                      <div class="input-group inline-inputs">
                        <div class="input-group mb-3" style="border-radius: 5px 5px 0 0; margin-left: 10px;">
                          <select class="selectpicker mx-auto multiple-customer-field" title="Filter by Customer" id="" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
                            ${H.map(l=>`<option value="${l.value}">${l.text}</option>`)}
                          </select>
                        </div>
                        <div class="mb-3" style="border-radius: 5px 5px 0 0; margin-left: 10px;">
                          <input type="text" class="form-control" id="woTitle" placeholder="Enter Work Order Title">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-wrapper">
                  ${C.map(l=>`
                    <div class="card-item" id="${l.id}" draggable="true" ondragstart="dragFunctions(event);" ondragend="dragFunctions(event);" draggable="true">
                      <div class="card-head">
                        <a href="${l.woUrl}" target="_blank"><strong>${l.name}</strong></a>
                        <div class="card-header-options">
                          <div class="dropdown">
                            <i class="fa-solid fa-angles-down" style="cursor: pointer"></i>
                            <div class="dropdown-content">
                              <a href="#" onclick="holdWorkOrder(event)">Hold</a>
                              <a href="#" onclick="printWorkOrder(event)">Print</a>
                              <a href="#" onclick="cancelWorkOrder(event)">Cancel</a>
                              <a href="#" onclick="printPickList(event)">Print Pick List</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="card-content">
                        <div class="card-content-woId" woId="${l.id}">ID ${l.id}</div>
                        <div class="card-content-customer" customerId="${l.customer.value}"><strong>${l.customer.text}</strong></div>
                        <div class="card-content-date">${l.date}</div>
                        <div class="card-content-so"><a href="${l.soUrl}" target="_blank">${l.salesorder.text}</a></div>
                        <div class="card-content-project"><a href="${l.projectUrl}" target="_blank">${l.project.text}</a></div>
                        <div class="card-content-project"><strong>EST Hours: </strong>${l.esthours}</div>
                        <div>
                          <span class="badge py-1 px-2 rounded-pill text-uppercase" style="background-color: ${l.status.code};">${l.status.text}</span>
                        </div>
                      </div>
                    </div>  
                  `)}
                </div>
              </div>
            </div>

            <!-- Resizer Between Second and Third Columns -->
            <div class="resizer" id="columnResizer"></div>

            <!-- Resizable Third Column -->
            <div class="column resizable" id="thirdColumn" ondragenter="dragFunctions(event);" ondragover="dragFunctions(event);" ondrop="dragFunctions(event);" ondragleave="dragFunctions(event);">
              <div class="content">
                <div class="card-header header">
                  <div style="text-align: center;">
                    <i class="fa-regular fa-icon-size fa-calendar-check" style="font-size: 18px;"></i>
                    <span style="display: inline-block; margin-left: 5px"><h5><strong>Events</strong></h5></span>
                    <span class="badge badge-danger badge-pill counter">${I.length}</span>
                  </div>
                </div>
                <div id="col3-filter-tableWrapper" class="accordion accordion-flush">
                  <div class="accordion-item">
                      <h2 class="accordion-header" id="col3-filter-tableHeading">
                        <button class="accordion-button collapsed" type="button" data-toggle="collapse" data-target="#col3-filter-table" aria-expanded="false" aria-controls="col3-filter-table">
                          <i class="fa fa-filter"></i>
                          <strong class="grid-header">&nbsp;Filters</strong>
                        </button>
                      </h2>
                      <div id="col3-filter-table" class="accordion-collapse collapse" aria-labelledby="col3-filter-tableHeading" data-parent="#col3-filter-tableWrapper">
                        <div class="input-group inline-inputs" style="margin-top: 10px; margin-left: 10px;">
                          <div class="row align-items-center">
                            <label for="event-datefrom" class="col-form-label col-auto">From: </label>
                            <div class="col-auto">
                                <input type="date" class="form-control" id="event-datefrom">
                            </div>
                          </div>
                          <div class="row align-items-center">
                            <label for="event-dateto" class="col-form-label col-auto">To: </label>
                            <div class="col-auto">
                                <input type="date" class="form-control" id="event-dateto">
                            </div>
                          </div>
                        </div>
                        <div class="input-group inline-inputs" style="margin-top: 10px;">
                          <div class="input-group mb-3" style="border-radius: 5px 5px 0 0;">
                            <select class="selectpicker mx-auto multiple-resource-field" title="Filter by Resource Name" id="" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
                              ${N}
                            </select>
                          </div>
                          <div class="input-group mb-3">
                            <select class="selectpicker mx-auto multiple-resource-group-field" title="Filter by Resource Group" id="" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
                            ${P}
                            </select>
                          </div>
                        </div>
                        <div class="input-group inline-inputs">
                          <div class="mb-3">
                            <select class="selectpicker mx-auto multiple-event-status-field" title="Filter by Status" id="" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" multiple>
                              <option value="TENTATIVE">Tentative</option>
                              <option value="CONFIRMED">Confirmed</option>
                            </select>
                          </div>
                          <div class="mb-3">
                            <select class="selectpicker mx-auto multiple-event-priority-field" title="Filter by Priority" id="" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
                              <option value="1">Low</option>
                              <option value="2">Mid</option>
                              <option value="3">High</option>
                              <option value="4">Urgent</option>
                            </select>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
                <div class="secondary-row">
                  <button class="btn btn-primary button-add" onclick="openGeneralEventForm(event)">
                    <i class="fa-regular fa-icon-size fa-plus-square"></i> New
                  </button>
                  <!-- <button class="btn btn-primary button-submit" onclick="submitEvents(event)">
                    <i class="fa-solid fa-file-export"></i> Submit -->
                  </button>
                </div>
                <div class="card-wrapper">
                  ${I.map(l=>`
                    <div class="card-item" id="${l.id}">
                      <div class="card-head">
                        <div class="card-name"><a href="${l.url}" target="_blank"><strong>${l.title}</strong></a></div>
                        <div class="card-header-options">
                          <div class="dropdown">
                            <i class="fa-solid fa-angles-down" style="cursor: pointer"></i>
                            <div class="dropdown-content">
                              <a href="#" onclick="openEventForm(event)">Update Event</a>
                              <a href="#" onclick="openCompleteEventForm(event)">Complete Event</a>
                              <a href="#" onclick="deleteEventRecord(event)">Remove Event</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="card-content">
                        <div class="card-content-eventId" eventId="${l.id}">ID ${l.id}</div>
                        <div class="card-content-woText">${l.workorder.text}</div>
                        <div class="card-content-date">${l.date.start==l.date.end?l.date.start:`${l.date.start} - ${l.date.end}`}</div>
                        <div class="card-content-time">${l.time.start} - ${l.time.end}</div>
                        <div class="row">
                          <div class="col-2 fc-event-status">
                            <span class="badge py-1 px-2 ${l.status.code} rounded-pill text-uppercase">${l.status.text}</span>
                            <span class="badge py-1 px-2 rounded-pill text-uppercase" style="background-color: ${l.priority.code};">${l.priority.text}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  `)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`.replace(/,/g,"");document.addEventListener("DOMContentLoaded",function(l){T.showBanners(),T.initLayoutHandlers(),f.MainForm().initialize(),f.GeneralEventForm().initialize(),f.CompleteEventForm().initialize(),window.holdWorkOrder=T.holdWorkOrder,window.printWorkOrder=T.printWorkOrder,window.cancelWorkOrder=T.cancelWorkOrder,window.printPickList=T.printPickList,window.deleteEventRecord=f.deleteEventRecord,window.dragFunctions=e=>{var a;switch(e.type){case"dragstart":thirdColumn.style.border="5px dashed #26CC4E";const n=(a=e.target.closest(".card-item").querySelector(".card-content-woId"))==null?void 0:a.getAttribute("woId");e.dataTransfer.setData("text/plain",n);return;case"drop":openEventForm(e);break;case"dragend":thirdColumn.style.border="";break}e.stopPropagation(),e.preventDefault()},window.openEventForm=e=>{const a=e.dataTransfer;let r,n;a?(r=a.getData("text"),$("#eventModal").attr("mode","create"),$("#eventModal").attr("woId",r)):(n=e.target.closest(".card-item").getAttribute("id"),$("#eventModal").attr("mode","edit"),$("#eventModal").attr("eventId",n)),(r||n)&&$("#eventModal").modal("toggle")},window.openGeneralEventForm=e=>{$("#generalEventModal").modal("toggle")},window.openCompleteEventForm=e=>{const a=e.target.closest(".card-item").getAttribute("id");console.log("openCompleteEventForm() > Event ID",a),$("#completeEventModal").attr("eventId",a),$("#completeEventModal").modal("toggle")}});document.querySelector("#app div#container div#tabSections").innerHTML+=`<div class="tab-pane fade" id="calendarSection" role="tabpanel" aria-labelledby="calendar-tab">
  <div id="calendar"></div>
</div>`;X();function X(){const l=[{id:"100740",title:"Work Order Sample July 22",start:"2024-08-24T08:00",end:"2024-08-24T18:00",url:"/app/crm/calendar/event.nl?id=100740&compid=TSTDRV2617106&selectedtab=custom337",color:"#6a95df",className:"event-class-style-name",extendedProps:{id:"33",name:"Work Order Sample July 22",title:"Work Order Sample July 22",project:{text:"AB&I Holdings : Parking Lot Construction",value:"1515"},date:"7/29/2024",status:{text:"Not Started",value:"4"},type:{text:"Moves",value:"3"},memo:"<p><strong>Work Order Sample July 22</strong></p>",salesorder:{text:"Sales Order #SLS00000609",value:"11722"},customer:{text:"AB&I Holdings",value:"1249"},resourceGroup:{text:"",value:""},priority:"",resources:{},items:[{id:"28",workorder:{text:"Work Order Sample July 22",value:"33"},event:{text:"Work Order Sample July 22",value:"100740"},uuid:"11722_1",line:"1",item:{text:"4321GR",value:"1015"},description:"11 POCKET MAGAZINE RACK",quantity:2,note:""},{id:"29",workorder:{text:"Work Order Sample July 22",value:"33"},event:{text:"Work Order Sample July 22",value:"100740"},uuid:"11722_2",line:"2",item:{text:"7031-0501",value:"1047"},description:"Friction Pad, Non-Carpeted Surfaces, Svc",quantity:3,note:""}],addresses:[{id:"27",workorder:{text:"Work Order Sample July 22",value:"33"},customer:{text:"AB&I Holdings",value:"1249"},event:{text:"Work Order Sample July 22",value:"100740"},address:{text:"1701 Rollins Road",value:"244878"},addressDetails:`Chad Bass
AB&I Holdings
1701 Rollins Road
Sacramento CA 94207
United States`,customerUrl:"/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"}],contacts:[{id:"14",workorder:{text:"Work Order Sample July 22",value:"33"},event:{text:"Work Order Sample July 22",value:"100740"},contact:{text:"AB&I Holdings : Chad Bass",value:"1382"},name:"Chad Bass",email:"cbass@sbi.com",jobTitle:"President",mobilePhone:"",phone:"",url:"/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"}],events:[{id:"100740",title:"Work Order Sample July 22",workorder:{text:"Work Order Sample July 22",value:"33"},project:{text:"AB&I Holdings : Parking Lot Construction",value:"1515"},location:"01: San Francisco",status:{text:"Confirmed",value:"CONFIRMED",code:"bg-success"},date:{start:"7/24/2024",end:"7/24/2024"},time:{start:"8:00 am",end:"6:00 pm"},priority:{text:"Urgent",value:"4",code:"bg-danger"},url:"/app/crm/calendar/event.nl?id=100740&compid=TSTDRV2617106&selectedtab=custom337",color:"#1a6756"}],projectUrl:"/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",woUrl:"/app/common/custom/custrecordentry.nl?rectype=838&id=33&compid=TSTDRV2617106"}},{id:"100739",title:"SLS00000621_WRKORDR001",start:"2024-08-23T08:00",end:"2024-08-23T18:00",url:"/app/crm/calendar/event.nl?id=100739&compid=TSTDRV2617106&selectedtab=custom337",color:"#bcdf87",className:"event-class-style-name",extendedProps:{id:"32",name:"SLS00000621_WRKORDR001",title:"SLS00000621_WRKORDR001",project:{text:"Test Test : Test Project",value:"1774"},date:"7/19/2024",status:{text:"Hold",value:"7"},type:{text:"Standard",value:"5"},memo:'<p><strong style="color: rgb(232, 230, 227); --darkreader-inline-color: #d8d4cf;" data-darkreader-inline-color="">Work Order Instructions QA Test</strong></p>',salesorder:{text:"Sales Order #SLS00000621",value:"13089"},customer:{text:"Test Test",value:"1493"},resourceGroup:{text:"",value:""},priority:"",resources:{},items:[{id:"26",workorder:{text:"SLS00000621_WRKORDR001",value:"32"},event:{text:"SLS00000621_WRKORDR001",value:"100739"},uuid:"13089_1",line:"1",item:{text:"VZCC-0054-HSS1",value:"2031"},description:"Compose,Top Trim 54In​【137 cm】.W,Stl, Pnl Frame",quantity:1,note:""},{id:"27",workorder:{text:"SLS00000621_WRKORDR001",value:"32"},event:{text:"",value:""},uuid:"13089_2",line:"2",item:{text:"VZCE-7400-HS1",value:"2032"},description:"Compose,Panel Trim,End-Of-Run 74In​【188 cm】.H, Steel",quantity:3,note:""}],addresses:[{id:"26",workorder:{text:"SLS00000621_WRKORDR001",value:"32"},customer:{text:"Test Test",value:"1493"},event:{text:"SLS00000621_WRKORDR001",value:"100739"},address:{text:"",value:""},addressDetails:"",customerUrl:"/app/common/entity/custjob.nl?id=1493&compid=TSTDRV2617106"}],contacts:[],events:[{id:"100739",title:"SLS00000621_WRKORDR001",workorder:{text:"SLS00000621_WRKORDR001",value:"32"},project:{text:"Test Test : Test Project",value:"1774"},location:"01: San Francisco",status:{text:"Tentative",value:"TENTATIVE",code:"bg-secondary"},date:{start:"7/23/2024",end:"7/23/2024"},time:{start:"8:00 am",end:"6:00 pm"},priority:{text:"Medium",value:"2",code:"bg-warning"},url:"/app/crm/calendar/event.nl?id=100739&compid=TSTDRV2617106&selectedtab=custom337",color:"#1a6756"}],projectUrl:"/app/accounting/project/project.nl?id=1774&compid=TSTDRV2617106",woUrl:"/app/common/custom/custrecordentry.nl?rectype=838&id=32&compid=TSTDRV2617106"}},{id:"100749",title:"Test",start:"2024-08-25T08:00",end:"2024-08-25T18:00",url:"/app/crm/calendar/event.nl?id=100749&compid=TSTDRV2617106&selectedtab=custom337",color:"#99042c",className:"event-class-style-name",extendedProps:{id:"31",name:"Test",title:"Test",project:{text:"AB&I Holdings : Parking Lot Construction",value:"1515"},date:"7/19/2024",status:{text:"Closed",value:"3"},type:{text:"Walls",value:"6"},memo:"<p>Test</p>",salesorder:{text:"Sales Order #SLS00000609",value:"11722"},customer:{text:"AB&I Holdings",value:"1249"},resourceGroup:{text:"",value:""},priority:"",resources:{},items:[{id:"24",workorder:{text:"Test",value:"31"},event:{text:"Test",value:"100738"},uuid:"11722_1",line:"1",item:{text:"4321GR",value:"1015"},description:"11 POCKET MAGAZINE RACK",quantity:2,note:""},{id:"25",workorder:{text:"Test",value:"31"},event:{text:"Test",value:"100738"},uuid:"11722_2",line:"2",item:{text:"7031-0501",value:"1047"},description:"Friction Pad, Non-Carpeted Surfaces, Svc",quantity:4,note:""},{id:"30",workorder:{text:"Test",value:"31"},event:{text:"",value:""},uuid:"11722_1",line:"1",item:{text:"",value:""},description:"11 POCKET MAGAZINE RACK",quantity:2,note:""},{id:"31",workorder:{text:"Test",value:"31"},event:{text:"",value:""},uuid:"11722_2",line:"2",item:{text:"",value:""},description:"Friction Pad, Non-Carpeted Surfaces, Svc",quantity:4,note:""},{id:"32",workorder:{text:"Test",value:"31"},event:{text:"",value:""},uuid:"11722_1",line:"1",item:{text:"",value:""},description:"11 POCKET MAGAZINE RACK",quantity:2,note:""},{id:"33",workorder:{text:"Test",value:"31"},event:{text:"",value:""},uuid:"11722_2",line:"2",item:{text:"",value:""},description:"Friction Pad, Non-Carpeted Surfaces, Svc",quantity:4,note:""},{id:"34",workorder:{text:"Test",value:"31"},event:{text:"",value:""},uuid:"11722_1",line:"1",item:{text:"",value:""},description:"11 POCKET MAGAZINE RACK",quantity:2,note:""},{id:"35",workorder:{text:"Test",value:"31"},event:{text:"",value:""},uuid:"11722_2",line:"2",item:{text:"",value:""},description:"Friction Pad, Non-Carpeted Surfaces, Svc",quantity:4,note:""}],addresses:[{id:"24",workorder:{text:"Test",value:"31"},customer:{text:"AB&I Holdings",value:"1249"},event:{text:"",value:""},address:{text:"1701 Rollins Road",value:"244878"},addressDetails:`Chad Bass
AB&I Holdings
1701 Rollins Road
Sacramento CA 94207
United States`,customerUrl:"/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"}],contacts:[{id:"13",workorder:{text:"Test",value:"31"},event:{text:"",value:""},contact:{text:"AB&I Holdings : Chad Bass",value:"1382"},name:"Chad Bass",email:"cbass@sbi.com",jobTitle:"President",mobilePhone:"",phone:"",url:"/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"}],events:[{id:"100749",title:"Test",workorder:{text:"Test",value:"31"},project:{text:"AB&I Holdings : Parking Lot Construction",value:"1515"},location:"01: San Francisco",status:{text:"Tentative",value:"TENTATIVE",code:"bg-secondary"},date:{start:"7/25/2024",end:"7/25/2024"},time:{start:"8:00 am",end:"6:00 pm"},priority:{text:"Low",value:"1",code:"bg-secondary"},url:"/app/crm/calendar/event.nl?id=100749&compid=TSTDRV2617106&selectedtab=custom337",color:"#1a6756"},{id:"100738",title:"Test",workorder:{text:"Test",value:"31"},project:{text:"AB&I Holdings : Parking Lot Construction",value:"1515"},location:"01: San Francisco",status:{text:"Confirmed",value:"CONFIRMED",code:"bg-success"},date:{start:"7/23/2024",end:"7/23/2024"},time:{start:"8:00 am",end:"6:00 pm"},priority:{text:"Urgent",value:"4",code:"bg-danger"},url:"/app/crm/calendar/event.nl?id=100738&compid=TSTDRV2617106&selectedtab=custom337",color:"#1a6756"},{id:"100723",title:"Test",workorder:{text:"Test",value:"31"},project:{text:"AB&I Holdings : Parking Lot Construction",value:"1515"},location:"01: San Francisco",status:{text:"Confirmed",value:"CONFIRMED",code:"bg-success"},date:{start:"7/8/2024",end:"7/8/2024"},time:{start:"8:00 am",end:"6:00 pm"},priority:{text:"Urgent",value:"4",code:"bg-danger"},url:"/app/crm/calendar/event.nl?id=100723&compid=TSTDRV2617106&selectedtab=custom337",color:"#1a6756"}],projectUrl:"/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",woUrl:"/app/common/custom/custrecordentry.nl?rectype=838&id=31&compid=TSTDRV2617106"}},{id:"100738",title:"Test",start:"2024-08-23T08:00",end:"2024-08-23T18:00",url:"/app/crm/calendar/event.nl?id=100738&compid=TSTDRV2617106&selectedtab=custom337",color:"#7c9d0",className:"event-class-style-name",extendedProps:{id:"31",name:"Test",title:"Test",project:{text:"AB&I Holdings : Parking Lot Construction",value:"1515"},date:"7/19/2024",status:{text:"Closed",value:"3"},type:{text:"Walls",value:"6"},memo:"<p>Test</p>",salesorder:{text:"Sales Order #SLS00000609",value:"11722"},customer:{text:"AB&I Holdings",value:"1249"},resourceGroup:{text:"",value:""},priority:"",resources:{},items:[{id:"24",workorder:{text:"Test",value:"31"},event:{text:"Test",value:"100738"},uuid:"11722_1",line:"1",item:{text:"4321GR",value:"1015"},description:"11 POCKET MAGAZINE RACK",quantity:2,note:""},{id:"25",workorder:{text:"Test",value:"31"},event:{text:"Test",value:"100738"},uuid:"11722_2",line:"2",item:{text:"7031-0501",value:"1047"},description:"Friction Pad, Non-Carpeted Surfaces, Svc",quantity:4,note:""},{id:"30",workorder:{text:"Test",value:"31"},event:{text:"",value:""},uuid:"11722_1",line:"1",item:{text:"",value:""},description:"11 POCKET MAGAZINE RACK",quantity:2,note:""},{id:"31",workorder:{text:"Test",value:"31"},event:{text:"",value:""},uuid:"11722_2",line:"2",item:{text:"",value:""},description:"Friction Pad, Non-Carpeted Surfaces, Svc",quantity:4,note:""},{id:"32",workorder:{text:"Test",value:"31"},event:{text:"",value:""},uuid:"11722_1",line:"1",item:{text:"",value:""},description:"11 POCKET MAGAZINE RACK",quantity:2,note:""},{id:"33",workorder:{text:"Test",value:"31"},event:{text:"",value:""},uuid:"11722_2",line:"2",item:{text:"",value:""},description:"Friction Pad, Non-Carpeted Surfaces, Svc",quantity:4,note:""},{id:"34",workorder:{text:"Test",value:"31"},event:{text:"",value:""},uuid:"11722_1",line:"1",item:{text:"",value:""},description:"11 POCKET MAGAZINE RACK",quantity:2,note:""},{id:"35",workorder:{text:"Test",value:"31"},event:{text:"",value:""},uuid:"11722_2",line:"2",item:{text:"",value:""},description:"Friction Pad, Non-Carpeted Surfaces, Svc",quantity:4,note:""}],addresses:[{id:"24",workorder:{text:"Test",value:"31"},customer:{text:"AB&I Holdings",value:"1249"},event:{text:"",value:""},address:{text:"1701 Rollins Road",value:"244878"},addressDetails:`Chad Bass
AB&I Holdings
1701 Rollins Road
Sacramento CA 94207
United States`,customerUrl:"/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"}],contacts:[{id:"13",workorder:{text:"Test",value:"31"},event:{text:"",value:""},contact:{text:"AB&I Holdings : Chad Bass",value:"1382"},name:"Chad Bass",email:"cbass@sbi.com",jobTitle:"President",mobilePhone:"",phone:"",url:"/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"}],events:[{id:"100749",title:"Test",workorder:{text:"Test",value:"31"},project:{text:"AB&I Holdings : Parking Lot Construction",value:"1515"},location:"01: San Francisco",status:{text:"Tentative",value:"TENTATIVE",code:"bg-secondary"},date:{start:"7/25/2024",end:"7/25/2024"},time:{start:"8:00 am",end:"6:00 pm"},priority:{text:"Low",value:"1",code:"bg-secondary"},url:"/app/crm/calendar/event.nl?id=100749&compid=TSTDRV2617106&selectedtab=custom337",color:"#1a6756"},{id:"100738",title:"Test",workorder:{text:"Test",value:"31"},project:{text:"AB&I Holdings : Parking Lot Construction",value:"1515"},location:"01: San Francisco",status:{text:"Confirmed",value:"CONFIRMED",code:"bg-success"},date:{start:"7/23/2024",end:"7/23/2024"},time:{start:"8:00 am",end:"6:00 pm"},priority:{text:"Urgent",value:"4",code:"bg-danger"},url:"/app/crm/calendar/event.nl?id=100738&compid=TSTDRV2617106&selectedtab=custom337",color:"#1a6756"},{id:"100723",title:"Test",workorder:{text:"Test",value:"31"},project:{text:"AB&I Holdings : Parking Lot Construction",value:"1515"},location:"01: San Francisco",status:{text:"Confirmed",value:"CONFIRMED",code:"bg-success"},date:{start:"7/8/2024",end:"7/8/2024"},time:{start:"8:00 am",end:"6:00 pm"},priority:{text:"Urgent",value:"4",code:"bg-danger"},url:"/app/crm/calendar/event.nl?id=100723&compid=TSTDRV2617106&selectedtab=custom337",color:"#1a6756"}],projectUrl:"/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",woUrl:"/app/common/custom/custrecordentry.nl?rectype=838&id=31&compid=TSTDRV2617106"}},{id:"100723",title:"Test",start:"2024-08-08T08:00",end:"2024-08-08T18:00",url:"/app/crm/calendar/event.nl?id=100723&compid=TSTDRV2617106&selectedtab=custom337",color:"#2f516f",className:"event-class-style-name",extendedProps:{id:"31",name:"Test",title:"Test",project:{text:"AB&I Holdings : Parking Lot Construction",value:"1515"},date:"7/19/2024",status:{text:"Closed",value:"3"},type:{text:"Walls",value:"6"},memo:"<p>Test</p>",salesorder:{text:"Sales Order #SLS00000609",value:"11722"},customer:{text:"AB&I Holdings",value:"1249"},resourceGroup:{text:"",value:""},priority:"",resources:{},items:[{id:"24",workorder:{text:"Test",value:"31"},event:{text:"Test",value:"100738"},uuid:"11722_1",line:"1",item:{text:"4321GR",value:"1015"},description:"11 POCKET MAGAZINE RACK",quantity:2,note:""},{id:"25",workorder:{text:"Test",value:"31"},event:{text:"Test",value:"100738"},uuid:"11722_2",line:"2",item:{text:"7031-0501",value:"1047"},description:"Friction Pad, Non-Carpeted Surfaces, Svc",quantity:4,note:""},{id:"30",workorder:{text:"Test",value:"31"},event:{text:"",value:""},uuid:"11722_1",line:"1",item:{text:"",value:""},description:"11 POCKET MAGAZINE RACK",quantity:2,note:""},{id:"31",workorder:{text:"Test",value:"31"},event:{text:"",value:""},uuid:"11722_2",line:"2",item:{text:"",value:""},description:"Friction Pad, Non-Carpeted Surfaces, Svc",quantity:4,note:""},{id:"32",workorder:{text:"Test",value:"31"},event:{text:"",value:""},uuid:"11722_1",line:"1",item:{text:"",value:""},description:"11 POCKET MAGAZINE RACK",quantity:2,note:""},{id:"33",workorder:{text:"Test",value:"31"},event:{text:"",value:""},uuid:"11722_2",line:"2",item:{text:"",value:""},description:"Friction Pad, Non-Carpeted Surfaces, Svc",quantity:4,note:""},{id:"34",workorder:{text:"Test",value:"31"},event:{text:"",value:""},uuid:"11722_1",line:"1",item:{text:"",value:""},description:"11 POCKET MAGAZINE RACK",quantity:2,note:""},{id:"35",workorder:{text:"Test",value:"31"},event:{text:"",value:""},uuid:"11722_2",line:"2",item:{text:"",value:""},description:"Friction Pad, Non-Carpeted Surfaces, Svc",quantity:4,note:""}],addresses:[{id:"24",workorder:{text:"Test",value:"31"},customer:{text:"AB&I Holdings",value:"1249"},event:{text:"",value:""},address:{text:"1701 Rollins Road",value:"244878"},addressDetails:`Chad Bass
AB&I Holdings
1701 Rollins Road
Sacramento CA 94207
United States`,customerUrl:"/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"}],contacts:[{id:"13",workorder:{text:"Test",value:"31"},event:{text:"",value:""},contact:{text:"AB&I Holdings : Chad Bass",value:"1382"},name:"Chad Bass",email:"cbass@sbi.com",jobTitle:"President",mobilePhone:"",phone:"",url:"/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"}],events:[{id:"100749",title:"Test",workorder:{text:"Test",value:"31"},project:{text:"AB&I Holdings : Parking Lot Construction",value:"1515"},location:"01: San Francisco",status:{text:"Tentative",value:"TENTATIVE",code:"bg-secondary"},date:{start:"7/25/2024",end:"7/25/2024"},time:{start:"8:00 am",end:"6:00 pm"},priority:{text:"Low",value:"1",code:"bg-secondary"},url:"/app/crm/calendar/event.nl?id=100749&compid=TSTDRV2617106&selectedtab=custom337",color:"#1a6756"},{id:"100738",title:"Test",workorder:{text:"Test",value:"31"},project:{text:"AB&I Holdings : Parking Lot Construction",value:"1515"},location:"01: San Francisco",status:{text:"Confirmed",value:"CONFIRMED",code:"bg-success"},date:{start:"7/23/2024",end:"7/23/2024"},time:{start:"8:00 am",end:"6:00 pm"},priority:{text:"Urgent",value:"4",code:"bg-danger"},url:"/app/crm/calendar/event.nl?id=100738&compid=TSTDRV2617106&selectedtab=custom337",color:"#1a6756"},{id:"100723",title:"Test",workorder:{text:"Test",value:"31"},project:{text:"AB&I Holdings : Parking Lot Construction",value:"1515"},location:"01: San Francisco",status:{text:"Confirmed",value:"CONFIRMED",code:"bg-success"},date:{start:"7/8/2024",end:"7/8/2024"},time:{start:"8:00 am",end:"6:00 pm"},priority:{text:"Urgent",value:"4",code:"bg-danger"},url:"/app/crm/calendar/event.nl?id=100723&compid=TSTDRV2617106&selectedtab=custom337",color:"#1a6756"}],projectUrl:"/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",woUrl:"/app/common/custom/custrecordentry.nl?rectype=838&id=31&compid=TSTDRV2617106"}},{id:"100729",title:"Install Furniture",start:"2024-08-23T08:00",end:"2024-08-23T18:00",url:"/app/crm/calendar/event.nl?id=100729&compid=TSTDRV2617106&selectedtab=custom337",color:"#f98a2a",className:"event-class-style-name",extendedProps:{id:"1",name:"Install Furniture",title:"Install Furniture",project:{text:"AB&I Holdings : Parking Lot Construction",value:"1515"},date:"7/5/2024",status:{text:"In Progress",value:"1"},type:{text:"Demo",value:"1"},memo:'<p><span style="background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id malesuada enim, sed fringilla turpis. Nullam sed viverra risus. Fusce maximus sapien et neque elementum, et feugiat orci efficitur. Suspendisse faucibus lacus id justo tempus tempor. </span></p><p></p><p><span style="background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);">Vestibulum vehicula, libero sed interdum lobortis, nisi dolor tincidunt leo, vel accumsan erat mi et justo. Proin consectetur felis semper varius viverra. Nam neque nulla, feugiat ac tempor in, aliquet sed enim. </span></p><p></p><p><strong style="background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);">Fusce mattis, diam non tempus lacinia, diam eros semper mauris, a egestas lacus libero eget sapien. Donec convallis sit amet velit non euismod.</strong></p>',salesorder:{text:"Sales Order #SLS00000609",value:"11722"},customer:{text:"AB&I Holdings",value:"1249"},resourceGroup:{text:"",value:""},priority:"",resources:{},items:[{id:"1",workorder:{text:"Install Furniture",value:"1"},event:{text:"Install Furniture",value:"100729"},uuid:"11722_1",line:"1",item:{text:"4321GR",value:"1015"},description:"11 POCKET MAGAZINE RACK",quantity:2,note:""},{id:"2",workorder:{text:"Install Furniture",value:"1"},event:{text:"Install Furniture",value:"100729"},uuid:"11722_3",line:"3",item:{text:"BAG00002",value:"837"},description:"Sling Laptop Bag",quantity:10,note:""}],addresses:[{id:"1",workorder:{text:"Install Furniture",value:"1"},customer:{text:"AB&I Holdings",value:"1249"},event:{text:"Install Furniture",value:"100729"},address:{text:"1701 Rollins Road",value:"244878"},addressDetails:`Chad Bass
AB&I Holdings
1701 Rollins Road
Sacramento CA 94207
United States`,customerUrl:"/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"}],contacts:[{id:"1",workorder:{text:"Install Furniture",value:"1"},event:{text:"Install Furniture",value:"100729"},contact:{text:"AB&I Holdings : Chad Bass",value:"1382"},name:"Chad Bass",email:"cbass@sbi.com",jobTitle:"President",mobilePhone:"",phone:"",url:"/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"},{id:"15",workorder:{text:"Install Furniture",value:"1"},event:{text:"Vacation",value:"18"},contact:{text:"Pravallika Desetty",value:"1648"},name:"Pravallika Desetty",email:"pravallika@erpsuccesspartners.com",jobTitle:"",mobilePhone:"",phone:"",url:"/app/common/entity/contact.nl?id=1648&compid=TSTDRV2617106"}],events:[{id:"100729",title:"Install Furniture",workorder:{text:"Install Furniture",value:"1"},project:{text:"AB&I Holdings : Parking Lot Construction",value:"1515"},location:"01: San Francisco",status:{text:"Confirmed",value:"CONFIRMED",code:"bg-success"},date:{start:"7/23/2024",end:"7/23/2024"},time:{start:"8:00 am",end:"6:00 pm"},priority:{text:"Low",value:"1",code:"bg-secondary"},url:"/app/crm/calendar/event.nl?id=100729&compid=TSTDRV2617106&selectedtab=custom337",color:"#1a6756"},{id:"100718",title:"Install Furniture",workorder:{text:"Install Furniture",value:"1"},project:{text:"AB&I Holdings : Parking Lot Construction",value:"1515"},location:"01: San Francisco",status:{text:"Confirmed",value:"CONFIRMED",code:"bg-success"},date:{start:"7/9/2024",end:"7/9/2024"},time:{start:"7:00 am",end:"9:00 pm"},priority:{text:"Medium",value:"2",code:"bg-warning"},url:"/app/crm/calendar/event.nl?id=100718&compid=TSTDRV2617106&selectedtab=custom337",color:"#1a6756"},{id:"100682",title:"TEST EVENT",workorder:{text:"Install Furniture",value:"1"},project:{text:"AB&I Holdings : Lobby Remodel",value:"1514"},location:"",status:{text:"Confirmed",value:"CONFIRMED",code:"bg-success"},date:{start:"7/4/2024",end:"7/4/2024"},time:{start:"10:00 pm",end:"11:00 pm"},priority:{text:"Medium",value:"2",code:"bg-warning"},url:"/app/crm/calendar/event.nl?id=100682&compid=TSTDRV2617106&selectedtab=custom337",color:"#1a6756"}],projectUrl:"/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",woUrl:"/app/common/custom/custrecordentry.nl?rectype=838&id=1&compid=TSTDRV2617106"}},{id:"100718",title:"Install Furniture",start:"2024-08-09T07:00",end:"2024-08-09T21:00",url:"/app/crm/calendar/event.nl?id=100718&compid=TSTDRV2617106&selectedtab=custom337",color:"#f6bb51",className:"event-class-style-name",extendedProps:{id:"1",name:"Install Furniture",title:"Install Furniture",project:{text:"AB&I Holdings : Parking Lot Construction",value:"1515"},date:"7/5/2024",status:{text:"In Progress",value:"1"},type:{text:"Demo",value:"1"},memo:'<p><span style="background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id malesuada enim, sed fringilla turpis. Nullam sed viverra risus. Fusce maximus sapien et neque elementum, et feugiat orci efficitur. Suspendisse faucibus lacus id justo tempus tempor. </span></p><p></p><p><span style="background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);">Vestibulum vehicula, libero sed interdum lobortis, nisi dolor tincidunt leo, vel accumsan erat mi et justo. Proin consectetur felis semper varius viverra. Nam neque nulla, feugiat ac tempor in, aliquet sed enim. </span></p><p></p><p><strong style="background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);">Fusce mattis, diam non tempus lacinia, diam eros semper mauris, a egestas lacus libero eget sapien. Donec convallis sit amet velit non euismod.</strong></p>',salesorder:{text:"Sales Order #SLS00000609",value:"11722"},customer:{text:"AB&I Holdings",value:"1249"},resourceGroup:{text:"",value:""},priority:"",resources:{},items:[{id:"1",workorder:{text:"Install Furniture",value:"1"},event:{text:"Install Furniture",value:"100729"},uuid:"11722_1",line:"1",item:{text:"4321GR",value:"1015"},description:"11 POCKET MAGAZINE RACK",quantity:2,note:""},{id:"2",workorder:{text:"Install Furniture",value:"1"},event:{text:"Install Furniture",value:"100729"},uuid:"11722_3",line:"3",item:{text:"BAG00002",value:"837"},description:"Sling Laptop Bag",quantity:10,note:""}],addresses:[{id:"1",workorder:{text:"Install Furniture",value:"1"},customer:{text:"AB&I Holdings",value:"1249"},event:{text:"Install Furniture",value:"100729"},address:{text:"1701 Rollins Road",value:"244878"},addressDetails:`Chad Bass
AB&I Holdings
1701 Rollins Road
Sacramento CA 94207
United States`,customerUrl:"/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"}],contacts:[{id:"1",workorder:{text:"Install Furniture",value:"1"},event:{text:"Install Furniture",value:"100729"},contact:{text:"AB&I Holdings : Chad Bass",value:"1382"},name:"Chad Bass",email:"cbass@sbi.com",jobTitle:"President",mobilePhone:"",phone:"",url:"/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"},{id:"15",workorder:{text:"Install Furniture",value:"1"},event:{text:"Vacation",value:"18"},contact:{text:"Pravallika Desetty",value:"1648"},name:"Pravallika Desetty",email:"pravallika@erpsuccesspartners.com",jobTitle:"",mobilePhone:"",phone:"",url:"/app/common/entity/contact.nl?id=1648&compid=TSTDRV2617106"}],events:[{id:"100729",title:"Install Furniture",workorder:{text:"Install Furniture",value:"1"},project:{text:"AB&I Holdings : Parking Lot Construction",value:"1515"},location:"01: San Francisco",status:{text:"Confirmed",value:"CONFIRMED",code:"bg-success"},date:{start:"7/23/2024",end:"7/23/2024"},time:{start:"8:00 am",end:"6:00 pm"},priority:{text:"Low",value:"1",code:"bg-secondary"},url:"/app/crm/calendar/event.nl?id=100729&compid=TSTDRV2617106&selectedtab=custom337",color:"#1a6756"},{id:"100718",title:"Install Furniture",workorder:{text:"Install Furniture",value:"1"},project:{text:"AB&I Holdings : Parking Lot Construction",value:"1515"},location:"01: San Francisco",status:{text:"Confirmed",value:"CONFIRMED",code:"bg-success"},date:{start:"7/9/2024",end:"7/9/2024"},time:{start:"7:00 am",end:"9:00 pm"},priority:{text:"Medium",value:"2",code:"bg-warning"},url:"/app/crm/calendar/event.nl?id=100718&compid=TSTDRV2617106&selectedtab=custom337",color:"#1a6756"},{id:"100682",title:"TEST EVENT",workorder:{text:"Install Furniture",value:"1"},project:{text:"AB&I Holdings : Lobby Remodel",value:"1514"},location:"",status:{text:"Confirmed",value:"CONFIRMED",code:"bg-success"},date:{start:"7/4/2024",end:"7/4/2024"},time:{start:"10:00 pm",end:"11:00 pm"},priority:{text:"Medium",value:"2",code:"bg-warning"},url:"/app/crm/calendar/event.nl?id=100682&compid=TSTDRV2617106&selectedtab=custom337",color:"#1a6756"}],projectUrl:"/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",woUrl:"/app/common/custom/custrecordentry.nl?rectype=838&id=1&compid=TSTDRV2617106"}},{id:"100682",title:"TEST EVENT",start:"2024-08-04T22:00",end:"2024-08-04T23:00",url:"/app/crm/calendar/event.nl?id=100682&compid=TSTDRV2617106&selectedtab=custom337",color:"#7e0eb8",className:"event-class-style-name",extendedProps:{id:"1",name:"Install Furniture",title:"Install Furniture",project:{text:"AB&I Holdings : Parking Lot Construction",value:"1515"},date:"7/5/2024",status:{text:"In Progress",value:"1"},type:{text:"Demo",value:"1"},memo:'<p><span style="background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id malesuada enim, sed fringilla turpis. Nullam sed viverra risus. Fusce maximus sapien et neque elementum, et feugiat orci efficitur. Suspendisse faucibus lacus id justo tempus tempor. </span></p><p></p><p><span style="background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);">Vestibulum vehicula, libero sed interdum lobortis, nisi dolor tincidunt leo, vel accumsan erat mi et justo. Proin consectetur felis semper varius viverra. Nam neque nulla, feugiat ac tempor in, aliquet sed enim. </span></p><p></p><p><strong style="background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);">Fusce mattis, diam non tempus lacinia, diam eros semper mauris, a egestas lacus libero eget sapien. Donec convallis sit amet velit non euismod.</strong></p>',salesorder:{text:"Sales Order #SLS00000609",value:"11722"},customer:{text:"AB&I Holdings",value:"1249"},resourceGroup:{text:"",value:""},priority:"",resources:{},items:[{id:"1",workorder:{text:"Install Furniture",value:"1"},event:{text:"Install Furniture",value:"100729"},uuid:"11722_1",line:"1",item:{text:"4321GR",value:"1015"},description:"11 POCKET MAGAZINE RACK",quantity:2,note:""},{id:"2",workorder:{text:"Install Furniture",value:"1"},event:{text:"Install Furniture",value:"100729"},uuid:"11722_3",line:"3",item:{text:"BAG00002",value:"837"},description:"Sling Laptop Bag",quantity:10,note:""}],addresses:[{id:"1",workorder:{text:"Install Furniture",value:"1"},customer:{text:"AB&I Holdings",value:"1249"},event:{text:"Install Furniture",value:"100729"},address:{text:"1701 Rollins Road",value:"244878"},addressDetails:`Chad Bass
AB&I Holdings
1701 Rollins Road
Sacramento CA 94207
United States`,customerUrl:"/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"}],contacts:[{id:"1",workorder:{text:"Install Furniture",value:"1"},event:{text:"Install Furniture",value:"100729"},contact:{text:"AB&I Holdings : Chad Bass",value:"1382"},name:"Chad Bass",email:"cbass@sbi.com",jobTitle:"President",mobilePhone:"",phone:"",url:"/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"},{id:"15",workorder:{text:"Install Furniture",value:"1"},event:{text:"Vacation",value:"18"},contact:{text:"Pravallika Desetty",value:"1648"},name:"Pravallika Desetty",email:"pravallika@erpsuccesspartners.com",jobTitle:"",mobilePhone:"",phone:"",url:"/app/common/entity/contact.nl?id=1648&compid=TSTDRV2617106"}],events:[{id:"100729",title:"Install Furniture",workorder:{text:"Install Furniture",value:"1"},project:{text:"AB&I Holdings : Parking Lot Construction",value:"1515"},location:"01: San Francisco",status:{text:"Confirmed",value:"CONFIRMED",code:"bg-success"},date:{start:"7/23/2024",end:"7/23/2024"},time:{start:"8:00 am",end:"6:00 pm"},priority:{text:"Low",value:"1",code:"bg-secondary"},url:"/app/crm/calendar/event.nl?id=100729&compid=TSTDRV2617106&selectedtab=custom337",color:"#1a6756"},{id:"100718",title:"Install Furniture",workorder:{text:"Install Furniture",value:"1"},project:{text:"AB&I Holdings : Parking Lot Construction",value:"1515"},location:"01: San Francisco",status:{text:"Confirmed",value:"CONFIRMED",code:"bg-success"},date:{start:"7/9/2024",end:"7/9/2024"},time:{start:"7:00 am",end:"9:00 pm"},priority:{text:"Medium",value:"2",code:"bg-warning"},url:"/app/crm/calendar/event.nl?id=100718&compid=TSTDRV2617106&selectedtab=custom337",color:"#1a6756"},{id:"100682",title:"TEST EVENT",workorder:{text:"Install Furniture",value:"1"},project:{text:"AB&I Holdings : Lobby Remodel",value:"1514"},location:"",status:{text:"Confirmed",value:"CONFIRMED",code:"bg-success"},date:{start:"7/4/2024",end:"7/4/2024"},time:{start:"10:00 pm",end:"11:00 pm"},priority:{text:"Medium",value:"2",code:"bg-warning"},url:"/app/crm/calendar/event.nl?id=100682&compid=TSTDRV2617106&selectedtab=custom337",color:"#1a6756"}],projectUrl:"/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",woUrl:"/app/common/custom/custrecordentry.nl?rectype=838&id=1&compid=TSTDRV2617106"}}],e=document.getElementById("calendar"),a={};a.calendar=new FullCalendar.Calendar(e,{height:"100%",themeSystem:"bootstrap5",businessHours:!0,headerToolbar:{left:"prev,next",center:"title",right:"today,dayGridMonth,timeGridWeek,timeGridDay,listMonth createEventBtn"},initialView:"timeGridWeek",editable:!0,droppable:!0,drop:o=>{console.log("drop",o)},customButtons:{createEventBtn:{text:"New Event",click:()=>{addEvent()}}},events:l,views:{resourceTimelineDay:{buttonText:"Resources",slotDuration:"00:15"},resourceTimelineTenDay:{type:"resourceTimeline",duration:{days:10},buttonText:"10 days"}},eventMouseEnter:o=>{},eventMouseLeave:o=>{},eventClick:o=>{console.log("eventClick",o),o.event.url&&(o.jsEvent.preventDefault(),window.open(o.event.url,"_blank"))},eventReceive:o=>{console.log("eventReceive",o),a.draggedItem=o;const t=o.event._def.defId;a.temp_eventId=t,addEvent()},windowResize:function(o){}}),a.calendar.render(),$(`<div style="margin-left: 5px">
    <select class="selectpicker mx-auto multiple-resource-field" title="Filter by Name" id="" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
      <option value="1">XYZ</option>
      <option value="1">XYZ</option>
      <option value="1">XYZ</option>
      <option value="1">XYZ</option>
      <option value="1">XYZ</option>
    </select></div>`+`<div style="margin-left: 5px">
    <select class="selectpicker mx-auto multiple-resource-group-field" title="Filter by Group" id="" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
      <option value="2">XYZ GROUP</option>
      <option value="2">XYZ GROUP</option>
      <option value="2">XYZ GROUP</option>
    </select></div>`).insertAfter(".fc-next-button")}document.querySelector("#app").innerHTML+=`<div class="modal fade" id="eventModal" mode="" woId="" eventId="" eventDataSrc="" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="eventModalLabel"><strong class="table-header"></strong></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="spinner"></div>
      <div class="modal-body">
        <form id="eventSubmitForm" onsubmit="return validateForm()">
          <!-- First Accordion Item -->
          <div class="accordion" id="eventFirstAccordion">
            <div class="accordion-item">
              <h2 class="accordion-header" id="eventHeadingOne">
                <button class="accordion-button" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  <!-- <strong class="grid-header">&nbsp;Primary Information</strong> -->
                  <strong class="table-header">Primary Information</strong>
                </button>
              </h2>
              <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="eventHeadingOne" data-parent="#eventFirstAccordion">
                <div class="accordion-body">
                  <form>
                    <table class="table w-100 table-borderless" id="wo-primaryinfo">
                      <tr>
                        <td class="eventTitle">
                          <div>
                            <label for="eventTitleInput" class="form-label required">Event Title</label>
                            <input type="text" class="form-control eventTitleInput" required>
                          </div>
                        </td>
                        <td class="title">
                          <label class="form-label">Work Order</label>
                          <p></p>
                        </td>
                        <td class="project">
                          <label class="form-label">Project</label>
                          <p></p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div>
                            <label for="datefrom" class="form-label required">Start Date</label>
                            <input type="date" class="form-control datefrom" required>
                          </div>
                        </td>
                        <td>
                          <div>
                            <label for="dateto" class="form-label required">End Date</label>
                            <input type="date" class="form-control dateto" required>
                          </div>
                        </td>
                        <td rowspan="2">
                          <div>
                            <label for="textarea" class="form-label">Notes</label>
                            <textarea class="form-control note" rows="5"></textarea>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div>
                            <label for="starttime" class="form-label required">Start Time</label>
                            <input type="time" class="form-control starttime" required>
                          </div>
                        </td>
                        <td>
                          <div>
                            <label for="endtime" class="form-label required">End Time</label>
                            <input type="time" class="form-control endtime" required>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label for="priority" class="form-label">Priority</label>
                          <select class="form-select priority">
                            <option value="1" selected>Low</option>
                            <option value="2">Mid</option>
                            <option value="3">High</option>
                            <option value="4">Urgent</option>
                          </select>
                        </td>
                        <td>
                          <label for="status" class="form-label">Status</label>
                          <select class="form-select status">
                            <option value="TENTATIVE" selected>Tentative</option>
                            <option value="CONFIRMED">Confirmed</option>
                          </select>
                        </td>
                        <td>
                          <label class="form-check-label">All Day</label>
                          <div class="form-check form-switch w-100" style="margin-left: 30px">
                            <input class="form-check-input text-right alldayevent-switch" type="checkbox">
                          </div>
                        </td>
                      </tr>
                    </table>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <!-- Second Accordion Item -->
          <div class="accordion" id="eventSecondAccordion" style="margin-top: 15px">
            <div class="accordion-item">
              <h2 class="accordion-header" id="eventHeadingTwo">
                <button class="accordion-button" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                  <strong class="table-header">Select Available Resources</strong>
                </button>
              </h2>
              <div id="collapseTwo" class="accordion-collapse collapse show" aria-labelledby="eventHeadingTwo" data-parent="#eventSecondAccordion">
                <div class="accordion-body">
                  <div class="table-responsive">
                    <table class="table table-striped" id="woResources_dt">
                      <thead>
                      </thead>
                      <tbody>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Third Accordion Item -->
          <div class="accordion" id="eventThirdAccordion" style="margin-top: 15px">
            <div class="accordion-item">
              <h2 class="accordion-header" id="eventHeadingThree">
                <button class="accordion-button" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                  <strong class="table-header">Work Order Items</strong>
                </button>
              </h2>
              <div id="collapseThree" class="accordion-collapse collapse show" aria-labelledby="eventHeadingThree" data-parent="#eventThirdAccordion">
                <div class="accordion-body">
                  <div class="table-responsive">
                    <table class="table table-striped" id="woItems_dt">
                      <thead>
                      </thead>
                      <tbody>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Fourth Accordion Item -->
          <div class="accordion" id="eventFourthAccordion" style="margin-top: 15px">
            <div class="accordion-item">
              <h2 class="accordion-header" id="eventHeadingFourth">
                <button class="accordion-button" type="button" data-toggle="collapse" data-target="#collapseFourth" aria-expanded="true" aria-controls="collapseFourth">
                  <strong class="table-header">Work Order Contacts</strong>
                </button>
              </h2>
              <div id="collapseFourth" class="accordion-collapse collapse show" aria-labelledby="eventHeadingFourth" data-parent="#eventFourthAccordion">
                <div class="accordion-body">
                  <div class="table-responsive">
                    <table class="table table-striped" id="contacts">
                      <thead>
                      </thead>
                      <tbody>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Fifth Accordion Item -->
          <div class="accordion" id="eventFifthAccordion" style="margin-top: 15px">
            <div class="accordion-item">
              <h2 class="accordion-header" id="eventHeadingFifth">
                <button class="accordion-button" type="button" data-toggle="collapse" data-target="#collapseFifth" aria-expanded="true" aria-controls="collapseFifth">
                  <strong class="table-header">Work Order Addresses</strong>
                </button>
              </h2>
              <div id="collapseFifth" class="accordion-collapse collapse show" aria-labelledby="eventHeadingFifth" data-parent="#eventFifthAccordion">
                <div class="accordion-body">
                  <div class="table-responsive">
                    <table class="table table-striped" id="addresses">
                      <thead>
                      </thead>
                      <tbody>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="submit" form="eventSubmitForm" class="btn btn-primary">Save</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      </div>
    </div>
  </div>
</div>`;document.querySelector("#app").innerHTML+=`<div class="modal fade" id="generalEventModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="generalEventModalLabel">Create New Event</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="spinner"></div>
      <div class="modal-body">
        <form id="generalEventSubmitForm" onsubmit="return validateForm()">
          <!-- First Accordion Item -->
          <div class="accordion" id="generalEventFirstAccordion">
            <div class="accordion-item">
              <h2 class="accordion-header" id="generalEventHeadingOne">
                <button class="accordion-button" type="button" data-toggle="collapse" data-target="#generalEventCollapseOne" aria-expanded="true" aria-controls="generalEventCollapseOne">
                  <!-- <strong class="grid-header">&nbsp;Primary Information</strong> -->
                  <strong class="table-header">Primary Information</strong>
                </button>
              </h2>
              <div id="generalEventCollapseOne" class="accordion-collapse collapse show" aria-labelledby="generalEventHeadingOne" data-parent="#generalEventFirstAccordion">
                <div class="accordion-body">
                  <form>
                    <table class="table w-100 table-borderless" id="wo-primaryinfo-ge">
                      <tr>
                        <td class="eventTitle">
                          <div>
                            <label for="eventTitleInput" class="form-label required">Event Title</label>
                            <input type="text" class="form-control eventTitleInput" required>
                          </div>
                        </td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>
                          <div>
                            <label for="datefrom" class="form-label required">Start Date</label>
                            <input type="date" class="form-control datefrom" required>
                          </div>
                        </td>
                        <td>
                          <div>
                            <label for="dateto" class="form-label required">End Date</label>
                            <input type="date" class="form-control dateto" required>
                          </div>
                        </td>
                        <td rowspan="2">
                          <div>
                            <label for="textarea" class="form-label">Notes</label>
                            <textarea class="form-control note" rows="5"></textarea>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div>
                            <label for="starttime" class="form-label required">Start Time</label>
                            <input type="time" class="form-control starttime" required>
                          </div>
                        </td>
                        <td>
                          <div>
                            <label for="endtime" class="form-label required">End Time</label>
                            <input type="time" class="form-control endtime" required>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label for="priority" class="form-label">Priority</label>
                          <select class="form-select priority">
                            <option value="1" selected>Low</option>
                            <option value="2">Mid</option>
                            <option value="3">High</option>
                            <option value="4">Urgent</option>
                          </select>
                        </td>
                        <td>
                          <label for="status" class="form-label">Status</label>
                          <select class="form-select status">
                            <option value="TENTATIVE" selected>Tentative</option>
                            <option value="CONFIRMED">Confirmed</option>
                          </select>
                        </td>
                        <td>
                          <label class="form-check-label">All Day</label>
                          <div class="form-check form-switch w-100" style="margin-left: 30px">
                            <input class="form-check-input text-right alldayevent-switch" type="checkbox">
                          </div>
                        </td>
                      </tr>
                    </table>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <!-- Second Accordion Item -->
          <div class="accordion" id="generalEventSecondAccordion" style="margin-top: 15px">
            <div class="accordion-item">
              <h2 class="accordion-header" id="generalEventHeadingTwo">
                <button class="accordion-button" type="button" data-toggle="collapse" data-target="#generalEventCollapseTwo" aria-expanded="true" aria-controls="generalEventCollapseTwo">
                  <strong class="table-header">Select Available Resources</strong>
                </button>
              </h2>
              <div id="generalEventCollapseTwo" class="accordion-collapse collapse show" aria-labelledby="generalEventHeadingTwo" data-parent="#generalEventSecondAccordion">
                <div class="accordion-body">
                  <div class="table-responsive">
                    <table class="table table-striped" id="woResources_dt_ge">
                      <thead>
                      </thead>
                      <tbody>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="submit" form="generalEventSubmitForm" class="btn btn-primary">Save</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      </div>
    </div>
  </div>
</div>`;document.querySelector("#app").innerHTML+=`<div class="modal fade" id="completeEventModal" woId="" eventId="" punchLines="" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="completeEventModalLabel">Complete Event</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="spinner"></div>
      <div class="modal-body">
        <form id="completeEventSubmitForm" onsubmit="return validateForm()">
          <div>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th class="text-center">Event Title</th>
                  <th class="text-center">Work Order</th>
                  <th class="text-center">Project</th>
                  <th class="text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-center eventTitle"><p></p></td>
                  <td class="text-center title"><p></p></td>
                  <td class="text-center project"><p></p></td>
                  <td class="text-center status"><p></p></td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- First Accordion Item -->
          <div class="accordion" id="completeEventFirstAccordion" style="margin-top: 15px">
            <div class="accordion-item">
              <h2 class="accordion-header" id="completeEventHeadingFirst">
                <button class="accordion-button" type="button" data-toggle="collapse" data-target="#completeEventCollapseFirst" aria-expanded="true" aria-controls="completeEventCollapseFirst">
                  <strong class="table-header">Time Sheets</strong>
                </button>
              </h2>
              <div id="completeEventCollapseFirst" class="accordion-collapse collapse show" aria-labelledby="completeEventHeadingFirst" data-parent="#completeEventFirstAccordion">
                <div class="accordion-body">
                  <div class="table-responsive">
                    <table class="table table-striped" id="timeSheets_dt">
                      <thead>
                      </thead>
                      <tbody>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Second Accordion Item -->
          <div class="accordion" id="completeEventSecondAccordion" style="margin-top: 15px">
            <div class="accordion-item">
              <h2 class="accordion-header" id="completeEventHeadingTwo">
                <button class="accordion-button" type="button" data-toggle="collapse" data-target="#completeEventCollapseTwo" aria-expanded="true" aria-controls="completeEventCollapseTwo">
                  <strong class="table-header">Work Order Items</strong>
                </button>
              </h2>
              <div id="completeEventCollapseTwo" class="accordion-collapse collapse show" aria-labelledby="completeEventHeadingTwo" data-parent="#completeEventSecondAccordion">
                <div class="accordion-body">
                  <div class="table-responsive">
                    <table class="table table-striped" id="woItems_dt_ce">
                      <thead>
                      </thead>
                      <tbody>
                      </tbody>
                    </table>
                    <div class="d-grid gap-2 d-md-block float-end" style="margin: 10px 0 10px 0">
                      <button class="btn btn-primary" type="button" onclick="completeAll(event)">Complete All</button>
                      <button class="btn btn-secondary" type="button" onclick="clearAll(event)">Clear</button>
                    </div>
                    <br/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Third Accordion Item -->
          <div class="accordion" id="completeEventThirdAccordion" style="margin-top: 15px">
            <div class="accordion-item">
              <h2 class="accordion-header" id="completeeventHeadingThree">
                <button class="accordion-button" type="button" data-toggle="collapse" data-target="#completeEventCollapseThree" aria-expanded="true" aria-controls="completeEventCollapseThree">
                  <strong class="table-header">Punch Items</strong>
                </button>
              </h2>
              <div id="completeEventCollapseThree" class="accordion-collapse collapse show" aria-labelledby="completeeventHeadingThree" data-parent="#completeEventThirdAccordion">
                <div class="accordion-body">
                  <div class="table-responsive">
                    <table class="table table-striped" id="punchItems_dt">
                      <thead>
                      </thead>
                      <tbody>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="submit" form="completeEventSubmitForm" class="btn btn-primary">Save</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      </div>
    </div>
  </div>
</div>`;
