import { Int, String, Boolean, objectType, enumType, schemaFrom, listOf, notNull } from 'graphql-schema';
import Light from './light';
import { fetchLight } from './service';

const GroupType = enumType('GroupType')
    .value('LIGHT_GROUP', 'LightGroup')
    .value('ROOM', 'Room')
    .end();

const Group = objectType('Group')
    .field('id', notNull(Int), 'The unique ID')
    .field('name', notNull(String), 'The human readable name')
    .field('type', notNull(GroupType), 'The type of the group')
    .field('lights', notNull(listOf(Light)), 'The lights in this group')
        .resolve(({ lights }) => {
            console.log(`li: ${lights}`)
            return Promise.all(lights.map(id => fetchLight(null, { id })))
        })
    .end();

export default Group
