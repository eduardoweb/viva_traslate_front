import axios from 'axios';
const endpoint = process.env.REACT_APP_RUTA_API;

/**
 * This is a first sample endpoint for passing the token to viva.
 * The token param is set by axios interceptor in App route file
 */
export class HttpService {

	getQuizzesList() {
		return axios.get(`${endpoint}/api/quizzes`)
			.then(res => {
				const data = res.data;
				return Promise.resolve(data);

			}).catch(error => {
				return Promise.reject(error);
			})
	};

	editQuiz(datos) {
		return axios.put(`${endpoint}/api/quizzes/${datos._id}`, { name: datos.name })
			.then(res => {
				const data = res.data;
				return Promise.resolve(data);

			}).catch(error => {
				return Promise.reject(error);
			})
	};

	createQuiz(datos) {
		return axios.post(`${endpoint}/api/quizzes`, datos)
			.then(res => {
				const data = res.data;
				return Promise.resolve(data);

			}).catch(error => {
				return Promise.reject(error);
			})
	};

	deleteQuiz(datos) {
		return axios.delete(`${endpoint}/api/quizzes/${datos._id}`)
			.then(res => {
				const data = res.data;
				return Promise.resolve(data);

			}).catch(error => {
				return Promise.reject(error);
			})
	};

	getQuestionsList() {
		return axios.get(`${endpoint}/api/questions`)
			.then(res => {
				const data = res.data;
				return Promise.resolve(data);

			}).catch(error => {
				return Promise.reject(error);
			})
	};

	getQuestionsListByQuiz(quiz) {
		return axios.get(`${endpoint}/api/questions/${quiz}`)
			.then(res => {
				const data = res.data;
				return Promise.resolve(data);

			}).catch(error => {
				return Promise.reject(error);
			})
	};

	editQuestions(datos) {
		return axios.put(`${endpoint}/api/questions/${datos._id}`, { name: datos.name })
			.then(res => {
				const data = res.data;
				return Promise.resolve(data);

			}).catch(error => {
				return Promise.reject(error);
			})
	};

	createQuestion(datos) {
		return axios.post(`${endpoint}/api/questions`, datos)
			.then(res => {
				const data = res.data;
				return Promise.resolve(data);

			}).catch(error => {
				return Promise.reject(error);
			})
	};

	deleteQuestion(datos) {
		return axios.delete(`${endpoint}/api/questions/${datos._id}`)
			.then(res => {
				const data = res.data;
				return Promise.resolve(data);

			}).catch(error => {
				return Promise.reject(error);
			})
	};

	getAnswersListByQues(ques) {
		return axios.get(`${endpoint}/api/answers/${ques}`)
			.then(res => {
				const data = res.data;
				return Promise.resolve(data);

			}).catch(error => {
				return Promise.reject(error);
			})
	};

	editAnswers(datos) {
		return axios.put(`${endpoint}/api/answers/${datos._id}`, { name: datos.name, isCorrect : datos.isCorrect })
			.then(res => {
				const data = res.data;
				return Promise.resolve(data);

			}).catch(error => {
				return Promise.reject(error);
			})
	};

	createAnswers(datos) {
		return axios.post(`${endpoint}/api/answers`, datos)
			.then(res => {
				const data = res.data;
				return Promise.resolve(data);

			}).catch(error => {
				return Promise.reject(error);
			})
	};

	deleteAnswers(datos) {
		return axios.delete(`${endpoint}/api/answers/${datos._id}`)
			.then(res => {
				const data = res.data;
				return Promise.resolve(data);

			}).catch(error => {
				return Promise.reject(error);
			})
	};

}

