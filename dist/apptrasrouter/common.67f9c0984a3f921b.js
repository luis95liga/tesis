"use strict";(self.webpackChunkapptrasrouter=self.webpackChunkapptrasrouter||[]).push([[592],{6635:(d,s,h)=>{h.d(s,{M:()=>n});var t=h(2340),r=h(262),a=h(2843),l=h(4650),c=h(529);class n{constructor(e){this.http=e}getEmployee(){return this.http.get(`${t.N.API_URL}/employee/employee/`).pipe((0,r.K)(this.handlerError))}PostEmployee(e){return this.http.post(`${t.N.API_URL}/employee/employee/`,e).pipe((0,r.K)(this.handlerError))}GetIdEmployee(e){return this.http.get(`${t.N.API_URL}/employee/employee/${e}/`).pipe((0,r.K)(this.handlerError))}PutEmployee(e,i){return this.http.put(`${t.N.API_URL}/employee/employee/${i}/`,e).pipe((0,r.K)(this.handlerError))}DeleteEmployee(e){return this.http.delete(`${t.N.API_URL}/employee/employee/${e}/`).pipe((0,r.K)(this.handlerError))}Getperiodpayment(){return this.http.get(`${t.N.API_URL}/employee/periodpayment/`).pipe((0,r.K)(this.handlerError))}Postperiodpayment(e){return this.http.post(`${t.N.API_URL}/employee/periodpayment/`,e).pipe((0,r.K)(this.handlerError))}GetIdperiodpayment(e){return this.http.get(`${t.N.API_URL}/employee/periodpayment/${e}/`).pipe((0,r.K)(this.handlerError))}Putperiodpayment(e,i){return this.http.put(`${t.N.API_URL}/employee/periodpayment/${i}/`,e).pipe((0,r.K)(this.handlerError))}Deleteperiodpayment(e){return this.http.delete(`${t.N.API_URL}/employee/periodpayment/${e}/`).pipe((0,r.K)(this.handlerError))}GetPositionType(){return this.http.get(`${t.N.API_URL}/employee/positiontype/`).pipe((0,r.K)(this.handlerError))}PostPositionType(e){return this.http.post(`${t.N.API_URL}/employee/positiontype/`,e).pipe((0,r.K)(this.handlerError))}GetIdPositionType(e){return this.http.get(`${t.N.API_URL}/employee/positiontype/${e}/`).pipe((0,r.K)(this.handlerError))}PutPositionType(e,i){return this.http.put(`${t.N.API_URL}/employee/positiontype/${i}/`,e).pipe((0,r.K)(this.handlerError))}DeletePositionType(e){return this.http.delete(`${t.N.API_URL}/employee/positiontype/${e}/`).pipe((0,r.K)(this.handlerError))}GetPosition(){return this.http.get(`${t.N.API_URL}/employee/position/`).pipe((0,r.K)(this.handlerError))}PostPosition(e){return this.http.post(`${t.N.API_URL}/employee/position/`,e).pipe((0,r.K)(this.handlerError))}GetIdPosition(e){return this.http.get(`${t.N.API_URL}/employee/position/${e}/`).pipe((0,r.K)(this.handlerError))}PutPosition(e,i){return this.http.put(`${t.N.API_URL}/employee/position/${i}/`,e).pipe((0,r.K)(this.handlerError))}DeletePosition(e){return this.http.delete(`${t.N.API_URL}/employee/position/${e}/`).pipe((0,r.K)(this.handlerError))}GetLaborPayments(){return this.http.get(`${t.N.API_URL}/employee/laborpayments/`).pipe((0,r.K)(this.handlerError))}PostLaborPayments(e){return this.http.post(`${t.N.API_URL}/employee/laborpayments/`,e).pipe((0,r.K)(this.handlerError))}GetIdLaborPayments(e){return this.http.get(`${t.N.API_URL}/employee/laborpayments/${e}/`).pipe((0,r.K)(this.handlerError))}PutLaborPayments(e,i){return this.http.put(`${t.N.API_URL}/employee/laborpayments/${i}/`,e).pipe((0,r.K)(this.handlerError))}DeleteLaborPayments(e){return this.http.delete(`${t.N.API_URL}/employee/laborpayments/${e}/`).pipe((0,r.K)(this.handlerError))}GetPositionEmployee(e){return this.http.get(`${t.N.API_URL}/employee/employeeposition/${e}/`).pipe((0,r.K)(this.handlerError))}GetDocumentEmployee(e){return this.http.get(`${t.N.API_URL}/employee/documentemployee/${e}/`).pipe((0,r.K)(this.handlerError))}GetDocument(){return this.http.get(`${t.N.API_URL}/employee/documents/`).pipe((0,r.K)(this.handlerError))}PostDocument(e){return this.http.post(`${t.N.API_URL}/employee/documents/`,e).pipe((0,r.K)(this.handlerError))}GetIdDocument(e){return this.http.get(`${t.N.API_URL}/employee/documents/${e}/`).pipe((0,r.K)(this.handlerError))}PutDocument(e,i){return this.http.put(`${t.N.API_URL}/employee/documents/${i}/`,e).pipe((0,r.K)(this.handlerError))}DeleteDocument(e){return this.http.delete(`${t.N.API_URL}/employee/documents/${e}/`).pipe((0,r.K)(this.handlerError))}GetIsLogin(){return this.http.get(`${t.N.API_URL}/employee/islogin/`).pipe((0,r.K)(this.handlerError))}PostIsLogin(e){return this.http.post(`${t.N.API_URL}/employee/islogin/`,e).pipe((0,r.K)(this.handlerError))}GetIdIsLogin(e){return this.http.get(`${t.N.API_URL}/employee/islogin/${e}/`).pipe((0,r.K)(this.handlerError))}PutIsLogin(e,i){return this.http.put(`${t.N.API_URL}/employee/islogin/${i}/`,e).pipe((0,r.K)(this.handlerError))}DeleteIsLogin(e){return this.http.delete(`${t.N.API_URL}/employee/islogin/${e}/`).pipe((0,r.K)(this.handlerError))}GetDocumentType(){return this.http.get(`${t.N.API_URL}/employee/documenttypee/`).pipe((0,r.K)(this.handlerError))}PostDocumentType(e){return this.http.post(`${t.N.API_URL}/employee/documenttypee/`,e).pipe((0,r.K)(this.handlerError))}GetIdDocumentType(e){return this.http.get(`${t.N.API_URL}/employee/documenttypee/${e}/`).pipe((0,r.K)(this.handlerError))}PutDocumentType(e,i){return this.http.put(`${t.N.API_URL}/employee/documenttypee/${i}/`,e).pipe((0,r.K)(this.handlerError))}DeleteDocumentType(e){return this.http.delete(`${t.N.API_URL}/employee/documenttypee/${e}/`).pipe((0,r.K)(this.handlerError))}handlerError(e){let i="an error occured retrienving data";return e&&(i=`Error: code ${e.message}`),window.alert(i),"token_not_valid"==e.error.code&&window.location.reload(),(0,a._)(i)}}n.\u0275fac=function(e){return new(e||n)(l.\u0275\u0275inject(c.eN))},n.\u0275prov=l.\u0275\u0275defineInjectable({token:n,factory:n.\u0275fac,providedIn:"root"})},7121:(d,s,h)=>{h.d(s,{k:()=>p});var t=h(2340),r=h(262),a=h(2843),l=h(4650),c=h(529),n=h(9299);class p{constructor(i,o){this.http=i,this.router=o}GetCountry(){return this.http.get(`${t.N.API_URL}/company/country/`).pipe((0,r.K)(this.handlerError))}PostCountry(i){return this.http.post(`${t.N.API_URL}/company/country/`,i).pipe((0,r.K)(this.handlerError))}GetIdCountry(i){return this.http.get(`${t.N.API_URL}/company/country/${i}/`).pipe((0,r.K)(this.handlerError))}PutCountry(i,o){return this.http.put(`${t.N.API_URL}/company/country/${o}/`,i).pipe((0,r.K)(this.handlerError))}DeleteCountry(i){return this.http.delete(`${t.N.API_URL}/company/country/${i}/`).pipe((0,r.K)(this.handlerError))}GetProvince(){return this.http.get(`${t.N.API_URL}/company/province/`).pipe((0,r.K)(this.handlerError))}GetIdProvince(i){return this.http.get(`${t.N.API_URL}/company/province/${i}/`).pipe((0,r.K)(this.handlerError))}PostProvince(i){return this.http.post(`${t.N.API_URL}/company/province/`,i).pipe((0,r.K)(this.handlerError))}PutProvince(i,o){return this.http.put(`${t.N.API_URL}/company/province/${o}/`,i).pipe((0,r.K)(this.handlerError))}DeleteProvince(i){return this.http.delete(`${t.N.API_URL}/company/province/${i}/`).pipe((0,r.K)(this.handlerError))}GetLocation(){return this.http.get(`${t.N.API_URL}/company/locality/`).pipe((0,r.K)(this.handlerError))}GetIdLocation(i){return this.http.get(`${t.N.API_URL}/company/locality/${i}/`).pipe((0,r.K)(this.handlerError))}PostLocation(i){return this.http.post(`${t.N.API_URL}/company/locality/`,i).pipe((0,r.K)(this.handlerError))}PutLocation(i,o){return this.http.put(`${t.N.API_URL}/company/locality/${o}/`,i).pipe((0,r.K)(this.handlerError))}DeleteLocation(i){return this.http.delete(`${t.N.API_URL}/company/locality/${i}/`).pipe((0,r.K)(this.handlerError))}handlerError(i){let o="an error occured retrienving data";return i&&(o=`Error: code ${i.message}`),window.alert(o),"token_not_valid"==i.error.code&&window.location.reload(),(0,a._)(o)}}p.\u0275fac=function(i){return new(i||p)(l.\u0275\u0275inject(c.eN),l.\u0275\u0275inject(n.F0))},p.\u0275prov=l.\u0275\u0275defineInjectable({token:p,factory:p.\u0275fac,providedIn:"root"})},8216:(d,s,h)=>{h.d(s,{y:()=>n});var t=h(2340),r=h(262),a=h(2843),l=h(4650),c=h(529);class n{constructor(e){this.http=e}GetClient(){return this.http.get(`${t.N.API_URL}/clients/client/`).pipe((0,r.K)(this.handlerError))}PostClient(e){return this.http.post(`${t.N.API_URL}/clients/client/`,e).pipe((0,r.K)(this.handlerError))}GetIdClient(e){return this.http.get(`${t.N.API_URL}/clients/client/${e}/`).pipe((0,r.K)(this.handlerError))}PutClient(e,i){return this.http.put(`${t.N.API_URL}/clients/client/${i}/`,e).pipe((0,r.K)(this.handlerError))}DeleteClient(e){return this.http.delete(`${t.N.API_URL}/clients/client/${e}/`).pipe((0,r.K)(this.handlerError))}handlerError(e){let i="an error occured retrienving data";return e&&(i=`Error: code ${e.message}`),window.alert(i),"token_not_valid"==e.error.code&&window.location.reload(),(0,a._)(i)}}n.\u0275fac=function(e){return new(e||n)(l.\u0275\u0275inject(c.eN))},n.\u0275prov=l.\u0275\u0275defineInjectable({token:n,factory:n.\u0275fac,providedIn:"root"})},5006:(d,s,h)=>{h.d(s,{E:()=>p});var t=h(2340),r=h(262),a=h(2843),l=h(4650),c=h(529),n=h(9299);class p{constructor(i,o){this.http=i,this.router=o}GetCellars(){return this.http.get(`${t.N.API_URL}/route/cellars/`).pipe((0,r.K)(this.handlerError))}GetIdCellars(i){return this.http.get(`${t.N.API_URL}/route/cellars/${i}/`).pipe((0,r.K)(this.handlerError))}PostCellars(i){return this.http.post(`${t.N.API_URL}/route/cellars/`,i).pipe((0,r.K)(this.handlerError))}PutCellars(i,o){return this.http.put(`${t.N.API_URL}/route/cellars/${o}/`,i).pipe((0,r.K)(this.handlerError))}DeleteCellars(i){return this.http.delete(`${t.N.API_URL}/route/cellars/${i}/`).pipe((0,r.K)(this.handlerError))}GetDestinations(){return this.http.get(`${t.N.API_URL}/route/destination/`).pipe((0,r.K)(this.handlerError))}GetIdDestinations(i){return this.http.get(`${t.N.API_URL}/route/destination/${i}/`).pipe((0,r.K)(this.handlerError))}PostDestinations(i){return this.http.post(`${t.N.API_URL}/route/destination/`,i).pipe((0,r.K)(this.handlerError))}PutDestinations(i,o){return this.http.put(`${t.N.API_URL}/route/destination/${o}/`,i).pipe((0,r.K)(this.handlerError))}DeleteDestinations(i){return this.http.delete(`${t.N.API_URL}/route/destination/${i}/`).pipe((0,r.K)(this.handlerError))}handlerError(i){let o="an error occured retrienving data";return i&&(o=`Error: code ${i.message}`),window.alert(o),"token_not_valid"==i.error.code&&window.location.reload(),(0,a._)(o)}}p.\u0275fac=function(i){return new(i||p)(l.\u0275\u0275inject(c.eN),l.\u0275\u0275inject(n.F0))},p.\u0275prov=l.\u0275\u0275defineInjectable({token:p,factory:p.\u0275fac,providedIn:"root"})},8717:(d,s,h)=>{h.d(s,{E:()=>n});var t=h(2340),r=h(262),a=h(2843),l=h(4650),c=h(529);class n{constructor(e){this.http=e}GetTabulation(){return this.http.get(`${t.N.API_URL}/route/tabulation/`).pipe((0,r.K)(this.handlerError))}GetIdTabulation(e){return this.http.get(`${t.N.API_URL}/route/tabulation/${e}/`).pipe((0,r.K)(this.handlerError))}PostTabulation(e){return this.http.post(`${t.N.API_URL}/route/tabulation/`,e).pipe((0,r.K)(this.handlerError))}PutTabulation(e,i){return this.http.put(`${t.N.API_URL}/route/tabulation/${i}/`,e).pipe((0,r.K)(this.handlerError))}DeleteTabulation(e){return this.http.delete(`${t.N.API_URL}/route/tabulation/${e}/`).pipe((0,r.K)(this.handlerError))}GetTabulationCompany(e){return this.http.get(`${t.N.API_URL}/route/tabulationcompany/${e}/`).pipe((0,r.K)(this.handlerError))}GetTabulationOriginDestination(e,i,o){return this.http.get(`${t.N.API_URL}/route/tabulationorigindestination/${e}/${i}/${o}/`).pipe((0,r.K)(this.handlerError))}GetBill(){return this.http.get(`${t.N.API_URL}/route/bill/`).pipe((0,r.K)(this.handlerError))}GetIdBill(e){return this.http.get(`${t.N.API_URL}/route/bill/${e}/`).pipe((0,r.K)(this.handlerError))}PostBill(e){return this.http.post(`${t.N.API_URL}/route/bill/`,e).pipe((0,r.K)(this.handlerError))}PutBill(e,i){return this.http.put(`${t.N.API_URL}/route/bill/${i}/`,e).pipe((0,r.K)(this.handlerError))}DeleteBill(e){return this.http.delete(`${t.N.API_URL}/route/bill/${e}/`).pipe((0,r.K)(this.handlerError))}GetBillCompany(e,i){return this.http.get(`${t.N.API_URL}/route/billcompany/${e}/${i}/`).pipe((0,r.K)(this.handlerError))}GetConcepts(){return this.http.get(`${t.N.API_URL}/route/concepts/`).pipe((0,r.K)(this.handlerError))}GetIdConcepts(e){return this.http.get(`${t.N.API_URL}/route/concepts/${e}/`).pipe((0,r.K)(this.handlerError))}PostConcepts(e){return this.http.post(`${t.N.API_URL}/route/concepts/`,e).pipe((0,r.K)(this.handlerError))}PutConcepts(e,i){return this.http.put(`${t.N.API_URL}/route/concepts/${i}/`,e).pipe((0,r.K)(this.handlerError))}DeleteConcepts(e){return this.http.delete(`${t.N.API_URL}/route/concepts/${e}/`).pipe((0,r.K)(this.handlerError))}GetBillTabulation(e){return this.http.post(`${t.N.API_URL}/route/billtabulation/`,e).pipe((0,r.K)(this.handlerError))}handlerError(e){console.log(e);let i="an error occured retrienving data";return e&&(i=`Error: code ${e.message}`),window.alert(i),"token_not_valid"==e.error.code&&window.location.reload(),(0,a._)(i)}}n.\u0275fac=function(e){return new(e||n)(l.\u0275\u0275inject(c.eN))},n.\u0275prov=l.\u0275\u0275defineInjectable({token:n,factory:n.\u0275fac,providedIn:"root"})},2965:(d,s,h)=>{h.d(s,{k:()=>n});var t=h(2340),r=h(262),a=h(2843),l=h(4650),c=h(529);class n{constructor(e){this.http=e}GetOwer(){return this.http.get(`${t.N.API_URL}/vehicle/owner/`).pipe((0,r.K)(this.handlerError))}PostOwer(e){return this.http.post(`${t.N.API_URL}/vehicle/owner/`,{name:e.name,idcompany:e.idcompany}).pipe((0,r.K)(this.handlerError))}GetIdOwer(e){return this.http.get(`${t.N.API_URL}/vehicle/owner/${e}/`).pipe((0,r.K)(this.handlerError))}PutOwer(e,i){return this.http.put(`${t.N.API_URL}/vehicle/owner/${i}/`,{name:e.name,idcompany:e.idcompany}).pipe((0,r.K)(this.handlerError))}DeleteOwer(e){return this.http.delete(`${t.N.API_URL}/vehicle/owner/${e}/`).pipe((0,r.K)(this.handlerError))}GetVehicleUse(){return this.http.get(`${t.N.API_URL}/vehicle/vehicleuse/`).pipe((0,r.K)(this.handlerError))}PostVehicleUse(e){return this.http.post(`${t.N.API_URL}/vehicle/vehicleuse/`,e).pipe((0,r.K)(this.handlerError))}GetIdVehicleUse(e){return this.http.get(`${t.N.API_URL}/vehicle/vehicleuse/${e}/`).pipe((0,r.K)(this.handlerError))}PutVehicleUse(e,i){return this.http.put(`${t.N.API_URL}/vehicle/vehicleuse/${i}/`,e).pipe((0,r.K)(this.handlerError))}DeleteVehicleUse(e){return this.http.delete(`${t.N.API_URL}/vehicle/vehicleuse/${e}/`).pipe((0,r.K)(this.handlerError))}GetManufacturer(){return this.http.get(`${t.N.API_URL}/vehicle/manufacturer/`).pipe((0,r.K)(this.handlerError))}PostManufacturer(e){return this.http.post(`${t.N.API_URL}/vehicle/manufacturer/`,e).pipe((0,r.K)(this.handlerError))}GetIdManufacturer(e){return this.http.get(`${t.N.API_URL}/vehicle/manufacturer/${e}/`).pipe((0,r.K)(this.handlerError))}PutManufacturer(e,i){return this.http.put(`${t.N.API_URL}/vehicle/manufacturer/${i}/`,e).pipe((0,r.K)(this.handlerError))}DeleteManufacturer(e){return this.http.delete(`${t.N.API_URL}/vehicle/manufacturer/${e}/`).pipe((0,r.K)(this.handlerError))}GetVehicleType(){return this.http.get(`${t.N.API_URL}/vehicle/vehicletype/`).pipe((0,r.K)(this.handlerError))}PostVehicleType(e){return this.http.post(`${t.N.API_URL}/vehicle/vehicletype/`,e).pipe((0,r.K)(this.handlerError))}GetIdVehicleType(e){return this.http.get(`${t.N.API_URL}/vehicle/vehicletype/${e}/`).pipe((0,r.K)(this.handlerError))}PutVehicleType(e,i){return this.http.put(`${t.N.API_URL}/vehicle/vehicletype/${i}/`,e).pipe((0,r.K)(this.handlerError))}DeleteVehicleType(e){return this.http.delete(`${t.N.API_URL}/vehicle/vehicletype/${e}/`).pipe((0,r.K)(this.handlerError))}GetFuel(){return this.http.get(`${t.N.API_URL}/vehicle/fuel/`).pipe((0,r.K)(this.handlerError))}PostFuel(e){return this.http.post(`${t.N.API_URL}/vehicle/fuel/`,e).pipe((0,r.K)(this.handlerError))}GetIdFuel(e){return this.http.get(`${t.N.API_URL}/vehicle/fuel/${e}/`).pipe((0,r.K)(this.handlerError))}PutFuel(e,i){return this.http.put(`${t.N.API_URL}/vehicle/fuel/${i}/`,e).pipe((0,r.K)(this.handlerError))}DeleteFuel(e){return this.http.delete(`${t.N.API_URL}/vehicle/fuel/${e}/`).pipe((0,r.K)(this.handlerError))}GetTechnicalData(){return this.http.get(`${t.N.API_URL}/vehicle/technicaldata/`).pipe((0,r.K)(this.handlerError))}PostTechnicalData(e){return this.http.post(`${t.N.API_URL}/vehicle/technicaldata/`,e).pipe((0,r.K)(this.handlerError))}GetIdTechnicalData(e){return this.http.get(`${t.N.API_URL}/vehicle/technicaldata/${e}/`).pipe((0,r.K)(this.handlerError))}PutTechnicalData(e,i){return this.http.put(`${t.N.API_URL}/vehicle/technicaldata/${i}/`,e).pipe((0,r.K)(this.handlerError))}DeleteTechnicalData(e){return this.http.delete(`${t.N.API_URL}/vehicle/technicaldata/${e}/`).pipe((0,r.K)(this.handlerError))}GetTechnicalDataTrailer(){return this.http.get(`${t.N.API_URL}/vehicle/technicaldatatraile/`).pipe((0,r.K)(this.handlerError))}PostTechnicalDataTrailer(e){return this.http.post(`${t.N.API_URL}/vehicle/technicaldatatraile/`,e).pipe((0,r.K)(this.handlerError))}GetIdTechnicalDataTrailer(e){return this.http.get(`${t.N.API_URL}/vehicle/technicaldatatraile/${e}/`).pipe((0,r.K)(this.handlerError))}PutTechnicalDataTrailer(e,i){return this.http.put(`${t.N.API_URL}/vehicle/technicaldatatraile/${i}/`,e).pipe((0,r.K)(this.handlerError))}DeleteTechnicalDataTrailer(e){return this.http.delete(`${t.N.API_URL}/vehicle/technicaldata/${e}/`).pipe((0,r.K)(this.handlerError))}GetVehicleModel(){return this.http.get(`${t.N.API_URL}/vehicle/vehiclemodel/`).pipe((0,r.K)(this.handlerError))}PostVehicleModel(e){return this.http.post(`${t.N.API_URL}/vehicle/vehiclemodel/`,e).pipe((0,r.K)(this.handlerError))}GetIdVehicleModel(e){return this.http.get(`${t.N.API_URL}/vehicle/vehiclemodel/${e}/`).pipe((0,r.K)(this.handlerError))}PutVehicleModel(e,i){return this.http.put(`${t.N.API_URL}/vehicle/vehiclemodel/${i}/`,e).pipe((0,r.K)(this.handlerError))}DeleteVehicleModel(e){return this.http.delete(`${t.N.API_URL}/vehicle/vehiclemodel/${e}/`).pipe((0,r.K)(this.handlerError))}GetAxis(){return this.http.get(`${t.N.API_URL}/vehicle/axes/`).pipe((0,r.K)(this.handlerError))}PostAxis(e){return this.http.post(`${t.N.API_URL}/vehicle/axes/`,e).pipe((0,r.K)(this.handlerError))}GetIdAxis(e){return this.http.get(`${t.N.API_URL}/vehicle/axes/${e}/`).pipe((0,r.K)(this.handlerError))}PutAxis(e,i){return this.http.put(`${t.N.API_URL}/vehicle/axes/${i}/`,e).pipe((0,r.K)(this.handlerError))}DeleteAxis(e){return this.http.delete(`${t.N.API_URL}/vehicle/axes/${e}/`).pipe((0,r.K)(this.handlerError))}GetGeneralDataVehicle(e){return this.http.get(`${t.N.API_URL}/vehicle/generaldatavehicle/${e}/`).pipe((0,r.K)(this.handlerError))}GetGeneralData(){return this.http.get(`${t.N.API_URL}/vehicle/generaldata/`).pipe((0,r.K)(this.handlerError))}PostGeneralData(e){return this.http.post(`${t.N.API_URL}/vehicle/generaldata/`,e).pipe((0,r.K)(this.handlerError))}GetIdGeneralData(e){return this.http.get(`${t.N.API_URL}/vehicle/generaldata/${e}/`).pipe((0,r.K)(this.handlerError))}PutGeneralData(e,i){return this.http.put(`${t.N.API_URL}/vehicle/generaldata/${i}/`,e).pipe((0,r.K)(this.handlerError))}DeleteGeneralData(e){return this.http.delete(`${t.N.API_URL}/vehicle/generaldata/${e}/`).pipe((0,r.K)(this.handlerError))}GetMaintenamceCostsVehicle(e){return this.http.get(`${t.N.API_URL}/vehicle/maintenamcecostsvehicle/${e}/`).pipe((0,r.K)(this.handlerError))}GetMaintenamceCosts(){return this.http.get(`${t.N.API_URL}/vehicle/maintenamcecosts/`).pipe((0,r.K)(this.handlerError))}PostMaintenamceCosts(e){return this.http.post(`${t.N.API_URL}/vehicle/maintenamcecosts/`,e).pipe((0,r.K)(this.handlerError))}GetIdMaintenamceCosts(e){return this.http.get(`${t.N.API_URL}/vehicle/maintenamcecosts/${e}/`).pipe((0,r.K)(this.handlerError))}PutMaintenamceCosts(e,i){return this.http.put(`${t.N.API_URL}/vehicle/maintenamcecosts/${i}/`,e).pipe((0,r.K)(this.handlerError))}DeleteMaintenamceCosts(e){return this.http.delete(`${t.N.API_URL}/vehicle/maintenamcecosts/${e}/`).pipe((0,r.K)(this.handlerError))}GetDocumentVehicle(e){return this.http.get(`${t.N.API_URL}/vehicle/documentvehicle/${e}/`).pipe((0,r.K)(this.handlerError))}GetDocument(){return this.http.get(`${t.N.API_URL}/vehicle/maintenamcecosts/`).pipe((0,r.K)(this.handlerError))}PostDocument(e){return this.http.post(`${t.N.API_URL}/vehicle/document/`,e).pipe((0,r.K)(this.handlerError))}GetIdDocument(e){return this.http.get(`${t.N.API_URL}/vehicle/document/${e}/`).pipe((0,r.K)(this.handlerError))}PutDocument(e,i){return this.http.put(`${t.N.API_URL}/vehicle/document/${i}/`,e).pipe((0,r.K)(this.handlerError))}DeleteDocument(e){return this.http.delete(`${t.N.API_URL}/vehicle/document/${e}/`).pipe((0,r.K)(this.handlerError))}GetDocumentType(){return this.http.get(`${t.N.API_URL}/vehicle/vehicledocumenttype/`).pipe((0,r.K)(this.handlerError))}PostDocumentType(e){return this.http.post(`${t.N.API_URL}/vehicle/vehicledocumenttype/`,e).pipe((0,r.K)(this.handlerError))}GetIdDocumentType(e){return this.http.get(`${t.N.API_URL}/vehicle/vehicledocumenttype/${e}/`).pipe((0,r.K)(this.handlerError))}PutDocumentType(e,i){return this.http.put(`${t.N.API_URL}/vehicle/vehicledocumenttype/${i}/`,e).pipe((0,r.K)(this.handlerError))}DeleteDocumentType(e){return this.http.delete(`${t.N.API_URL}/vehicle/vehicledocumenttype/${e}/`).pipe((0,r.K)(this.handlerError))}GetFixedCostsVehicle(e){return this.http.get(`${t.N.API_URL}/vehicle/fixedcostsvehicle/${e}/`).pipe((0,r.K)(this.handlerError))}GetFixedCosts(){return this.http.get(`${t.N.API_URL}/vehicle/fixedcosts/`).pipe((0,r.K)(this.handlerError))}PostFixedCosts(e){return this.http.post(`${t.N.API_URL}/vehicle/fixedcosts/`,e).pipe((0,r.K)(this.handlerError))}GetIdFixedCosts(e){return this.http.get(`${t.N.API_URL}/vehicle/fixedcosts/${e}/`).pipe((0,r.K)(this.handlerError))}PutFixedCosts(e,i){return this.http.put(`${t.N.API_URL}/vehicle/fixedcosts/${i}/`,e).pipe((0,r.K)(this.handlerError))}DeleteFixedCosts(e){return this.http.delete(`${t.N.API_URL}/vehicle/fixedcosts/${e}/`).pipe((0,r.K)(this.handlerError))}handlerError(e){let i="an error occured retrienving data";return e&&(i=`Error: code ${e.message}`),window.alert(i),"token_not_valid"==e.error.code&&window.location.reload(),(0,a._)(i)}}n.\u0275fac=function(e){return new(e||n)(l.\u0275\u0275inject(c.eN))},n.\u0275prov=l.\u0275\u0275defineInjectable({token:n,factory:n.\u0275fac,providedIn:"root"})},94:(d,s,h)=>{h.d(s,{f:()=>n});var t=h(2340),r=h(262),a=h(2843),l=h(4650),c=h(529);class n{constructor(e){this.http=e}PostCreateVehicle(e){return this.http.post(`${t.N.API_URL}/vehicle/vehiclecreate/`,e).pipe((0,r.K)(this.handlerError))}PostCreateTrailer(e){return this.http.post(`${t.N.API_URL}/vehicle/trailercreate/`,e).pipe((0,r.K)(this.handlerError))}GetTrailer(){return this.http.get(`${t.N.API_URL}/vehicle/trailer/`).pipe((0,r.K)(this.handlerError))}PostTrailer(e){return this.http.post(`${t.N.API_URL}/vehicle/trailer/`,e).pipe((0,r.K)(this.handlerError))}GetIdTrailer(e){return this.http.get(`${t.N.API_URL}/vehicle/trailer/${e}/`).pipe((0,r.K)(this.handlerError))}PutTrailer(e,i){return this.http.put(`${t.N.API_URL}/vehicle/trailer/${i}/`,e).pipe((0,r.K)(this.handlerError))}DeleteTrailer(e){return this.http.delete(`${t.N.API_URL}/vehicle/trailer/${e}/`).pipe((0,r.K)(this.handlerError))}GetVehicle(){return this.http.get(`${t.N.API_URL}/vehicle/vehicle/`).pipe((0,r.K)(this.handlerError))}PostVehicle(e){return this.http.post(`${t.N.API_URL}/vehicle/vehicle/`,e).pipe((0,r.K)(this.handlerError))}GetIdVehicle(e){return this.http.get(`${t.N.API_URL}/vehicle/vehicle/${e}/`).pipe((0,r.K)(this.handlerError))}PutVehicle(e,i){return this.http.put(`${t.N.API_URL}/vehicle/vehicle/${i}/`,e).pipe((0,r.K)(this.handlerError))}DeleteVehicle(e){return this.http.delete(`${t.N.API_URL}/vehicle/vehicle/${e}/`).pipe((0,r.K)(this.handlerError))}GetAssignVehiceTrailer(e){return this.http.get(`${t.N.API_URL}/vehicle/assignaehicletrailer/${e}/`).pipe((0,r.K)(this.handlerError))}GetAssignTrailer(){return this.http.get(`${t.N.API_URL}/vehicle/assigntrailer/`).pipe((0,r.K)(this.handlerError))}GetIdAssignTrailer(e){return this.http.get(`${t.N.API_URL}/vehicle/assigntrailer/${e}/`).pipe((0,r.K)(this.handlerError))}PostAssignTrailer(e){return this.http.post(`${t.N.API_URL}/vehicle/assigntrailer/`,e).pipe((0,r.K)(this.handlerError))}PutAssignTrailer(e,i){return this.http.put(`${t.N.API_URL}/vehicle/assigntrailer/${i}/`,e).pipe((0,r.K)(this.handlerError))}DeleteAssignTrailer(e){return this.http.delete(`${t.N.API_URL}/vehicle/assigntrailer/${e}/`).pipe((0,r.K)(this.handlerError))}handlerError(e){let i="an error occured retrienving data";return e&&(i=`Error: code ${e.message}`),window.alert(i),"token_not_valid"==e.error.code&&window.location.reload(),(0,a._)(i)}}n.\u0275fac=function(e){return new(e||n)(l.\u0275\u0275inject(c.eN))},n.\u0275prov=l.\u0275\u0275defineInjectable({token:n,factory:n.\u0275fac,providedIn:"root"})}}]);