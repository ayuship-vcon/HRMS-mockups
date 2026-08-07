import axios from "axios";
 
 
const api = axios.create({
  baseURL: "/api"
});
 
export const getEmployeQuestions = async () => {
  const response = await api.get(
    "/Questionnaire/getDesignationQuestionsForWagonWheel/143/false/false/2026"
  );
 console.log(response,'responseresponse')
  return response.data;
};
export const getAllAnswers = async () => {
  const response = await api.get(
    "/SelfRating/getAnsweredQuestions/260/143/2026/1"
  );
 console.log(response,'responseresponse')
  return response.data;
};
export const getAllReviewerRating = async () => {
  const response = await api.get(
    "/ReviewerRatingV2/getDifferentialReviewerRatings/82aaf5e1-6db1-4290-b9ba-f83e14307fef/260/143/2026/false/false"
  );
  return response.data;
};
export const getAllSelfRating = async () => {
  const response = await api.get(
    "/ReviewerRatingV2/getDifferentialReviewerRatings/82aaf5e1-6db1-4290-b9ba-f83e14307fef/260/143/2026/true/false"
  );
  return response.data;
};
