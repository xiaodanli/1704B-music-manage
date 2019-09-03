import request from '@/utils/request'

let music = {
    querymusic:data => request.get('/api/querymusic',data)  
}

export default music