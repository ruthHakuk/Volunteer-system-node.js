const helpRequests = require('../data/helpRequests')
const locationsData = require('../data/locations')
const priorityData = require('../data/priorities')
const volunteersData = require('../data/volunteers')
const statusData = require('../data/statuses')

class HelpRequestsService {

    // getAll(parameterToFilter) {
    //     let filteredRequests = helpRequests;
    //     if (parameterToFilter.status) {
    //         filteredRequests = helpRequests.filter(request => request.status == parameterToFilter.status);
    //     }
    //     if (parameterToFilter.priority) {
    //         const priorityRes = priorityData.find(p => p.name == parameterToFilter.priority);
    //         if (priorityRes) {
    //             filteredRequests = filteredRequests.filter(request => request.priority_code == priorityRes.code);
    //         }
    //     }
    //     if (parameterToFilter.location) {
    //         const locationres = locationsData.find(loc => loc.name === parameterToFilter.location);
    //         if (locationres) {
    //             filteredRequests = filteredRequests.filter(request => request.location_code == locationres.code);
    //         }
    //     }
    //     return filteredRequests;
    // }

//החזרת בקשות לפי סינון , במקרה שלא נכנסו פרמטרים לסינון יוחזרו כל הבקשות
    getAll(parameterToFilter) {
        let filteredRequests = helpRequests;
        const statusPar = parameterToFilter.status;
        const priorityPar = parameterToFilter.priority;
        const locationPar = parameterToFilter.location;
        if (statusPar) {
            const isStatusExsit = statusData.find(status => status == statusPar)
            if (!isStatusExsit) {
                throw new Error(`There is problem ,Status doesn't exsit!`);
            }
            else {
                filteredRequests = helpRequests.filter(request => request.status == statusPar);
            }
        }
        if (priorityPar) {
            const priorityRes = priorityData.find(p => p.name == priorityPar);
            if (!priorityRes) {
                throw new Error(`There is problem ,Priority doesn't exsit!`);
            }
            else {
                filteredRequests = filteredRequests.filter(request => request.priority_code == priorityRes.code);
            }
        }
        if (locationPar) {
            const locationres = locationsData.find(loc => loc.name === locationPar);
            if (!locationres) {
                throw new Error(`There is problem ,Location doesn't exsit!`);
            }
            else {
                filteredRequests = filteredRequests.filter(request => request.location_code == locationres.code);
            }
        }
        return filteredRequests;
    }



//עדכון סטטוס של בקשה של מתנדב מסויים
//במקרה והמתנדב אינו קיים תוחזר שגיאה בהתאם 
//במקרה שהבקשה שהוכנס אינה קיימת תוחזר שגיאה בהתאם
    update(volunteerId, RequestToUpdate) {
        let existingVolunteer = volunteersData.find(s => s.id == volunteerId);
        if (!existingVolunteer) {
            throw new Error(`Could not update volunteer, volunteer not found`);
        }

        let requestCodeIndex = helpRequests.findIndex(r => r.id == RequestToUpdate.id);
        if (requestCodeIndex === -1) {
            throw new Error(`Could not update volunteer request, request not found`);
        }

        let requestCode = helpRequests[requestCodeIndex];

        Object.assign(requestCode, {
            status: "בטיפול",
            volunteer_code: volunteerId
        });

        return requestCode;
    }
}



let helpRequestsService = new HelpRequestsService()
module.exports = helpRequestsService
