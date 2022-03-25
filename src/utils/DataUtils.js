import { supabase } from '../supabaseClient'

export async function getCats() {
    try {
        const user = supabase.auth.user()
        console.log("getting cats")
        let { data, error, status } = await supabase
          .from('Cats')
          .select(`id, name, photo_url`)
          .eq('isActive', true)
  
        if (error && status !== 406) {
          throw error
        }
  
        if (data) {
          console.log(data)
          return data
          
        } else {
            return {}
        }
      } catch (error) {
        alert(error.message)
      } 
}