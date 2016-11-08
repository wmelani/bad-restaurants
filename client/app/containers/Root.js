import '../../css/vendors.scss'
import '../../css/application.scss'

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./Root.prod');
} else {
    module.exports = require('./Root.dev');
}