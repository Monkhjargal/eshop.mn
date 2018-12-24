import CrudModel from './CrudModel';
import { asyncFn } from './utils';

class CodeModel extends CrudModel {
  get = ({ _id }) => asyncFn({
    url: `${this.url}/${_id}/code`, method: 'GET', model: this.model.get,
  })
  create = ({ formData: body }) => asyncFn({
    body, url: `${this.url}/code`, method: 'POST', model: this.model.create,
  })
  update = ({ _id, formData: body }) => asyncFn({
    body, url: `${this.url}/${_id}/code`, method: 'PUT', model: this.model.update,
  })
  delete = ({ _id }) => asyncFn({
    url: `${this.url}/${_id}/code`, method: 'DELETE', model: this.model.delete,
  })
  all = ({ body } = {}) => asyncFn({
    body, url: `${this.url}/code`, method: 'GET', model: this.model.all,
  })
}

export default CodeModel;
