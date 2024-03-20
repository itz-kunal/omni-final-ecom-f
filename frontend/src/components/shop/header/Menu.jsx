import {
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  PlusCircle,
  MenuIcon,
  UserCircle,
  ShoppingCart,
  ShoppingBag,
  TextSearch,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export default function DropdownMenuDemo() {
  const router = useRouter()
  return (
    <DropdownMenu className='outline'>
      <DropdownMenuTrigger asChild>
        <Button variant="outline"><MenuIcon /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={()=>router.push('/user/account')}>
            <UserCircle className="mr-2 h-4 w-4" />
            <span>Profile</span>

          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <TextSearch className="mr-2 h-4 w-4" />
              <span>Categories</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Snacks & Drinks</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Grocery & Kitchen</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <span>Fashion</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <ShoppingCart className="mr-2 h-4 w-4" />
            <span>My Cart</span>

          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push('/auth/register-shop')}>
            <ShoppingBag className="mr-2 h-4 w-4" />
            <span>Create Your Shop</span>

          </DropdownMenuItem>
        </DropdownMenuGroup>


        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <LifeBuoy className="mr-2 h-4 w-4" />
          <span>Support</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>

        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

