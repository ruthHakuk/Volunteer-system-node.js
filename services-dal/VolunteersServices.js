const volunteers = require('../data/volunteers')
class VolunteersService {

    //החזרת כל המתנדבים
    getAll(queryParameters) {
        let result = volunteers;
        return result;
    }
   //הוספת מתנדב חדש ,
   // במקרה שבו המתנדב מכניס תעודת זהות שכבר קיימת במערכת תוחזר שגיאה בהתאם
    insert(newVolunteer) {
        let foundVolunteerWithSameId = volunteers.filter(v => v.id == newVolunteer.id);
        if (foundVolunteerWithSameId.length > 0)
            throw new Error('invalid new Volunteer id');
        else {
            volunteers.push(newVolunteer);
            return newVolunteer;
        }
    }

}

let volunteersService = new VolunteersService();
module.exports = volunteersService;