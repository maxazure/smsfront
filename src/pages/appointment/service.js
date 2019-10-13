import request from '@/utils/request';

export async function queryAppointments(params) {
  let response = ''
  if (params) {
    response = request(`/api/appointments/?page=${params.currentPage || 1}&pagesize=${params.pageSize || 10}`);
  } else {
    response = request('/api/appointments/?page=1');
  }
  return response
}

export async function queryappointment(id) {
  return request(`/api/appointments/${id}`);
}

export async function removeAppointment(id) {
  return request(`/api/appointments/${id}`, {
    method: 'DELETE',
  });
}

export async function addAppointment(appointment) {
  return request('/api/appointments/', {
    method: 'post',
    data: {
      ...appointment,
    },
  });
}

export async function updateAppointment(appointment) {
  return request(`/api/appointments/${appointment.id}`, {
    method: 'put',
    data: {
      ...appointment,
    },
  });
}
