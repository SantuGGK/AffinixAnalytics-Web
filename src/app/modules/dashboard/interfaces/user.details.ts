
export interface UserDetails {
    username: string;
    role_id: number;
    role_desc: string;
    role_code: string;
    pwd_last_updated : string;
    phone: number;
    modified_at: string;
    isdeleted: Boolean;
    isdisabled: Boolean;
    id: number;
    fullname: string;
    email: string;
    created_at: string;
    services:[
        {
            name: string, 
            isprimary: Boolean, 
            payment_id: number, 
            snf_assoc_map_id: number, 
            id: string,
            role_code: string;
        }
    ];
}