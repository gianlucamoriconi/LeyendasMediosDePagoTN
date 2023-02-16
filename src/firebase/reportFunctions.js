import { addDoc, getDoc, getDocs, collection, query, where } from "firebase/firestore";
import { db } from "./config";

const createReport = (report, successAction = null, failAction = null) => {
    const reportsCollection = collection(db, 'reports');
    addDoc(reportsCollection, report)
        .then( (doc) =>{
            console.log(doc);
            successAction();
        })
        .catch( (error) =>{
            console.log(error);
            return failAction();
        })
        .finally( ()=> {
            console.log("Finished");
        })
};


const getReport = () =>{

    const reportReference = collection(db, 'reports')
    const q = query(reportReference, where('storeId', '==', 1234));

    getDocs(q)
        .then((reports) =>{
            const reportInfo = reports.docs.map( (doc) => doc.data() );
            console.log(reportInfo);

        })

        .catch( (error) =>{
            console.log(error);
        })
        .finally( ()=> {
            console.log("running");
        })

};

const getAllReports = () =>{

    const reportsCollection = collection(db, 'reports');

    getDoc(reportsCollection)
        .then((doc) =>{
            const reportInfo = doc.data();
            // setOrderInSuccess(reportInfo)
            console.log(reportInfo);

        })

        .catch( (error) =>{
            console.log(error);
        })
        .finally( ()=> {
            // setLoading(false);
        })

};

export { getReport, createReport, getAllReports } ;