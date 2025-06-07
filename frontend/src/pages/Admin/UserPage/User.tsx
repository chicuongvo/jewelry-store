/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Ban } from "lucide-react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllUsers } from "@/api/user.api";
import { toast } from "react-toastify";

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (_id: string) => {
      // Call api delete user
    },
    onSuccess: () => {
      toast.success("Ban user thành công");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      // Đóng dialog sau khi ban thành công
      setOpenDialogId(null);
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi ban user");
    },
  });

  const filteredUsers = users?.filter(
    (user: any) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBanUser = (userId: string) => {
    mutate(userId);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Users
          </h1>
          <p className="text-muted-foreground">Manage user accounts</p>
        </div>
        {/* <CreateUserDialog /> */}
      </div>

      <Card className="px-4">
        <CardHeader className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2 w-full max-w-sm">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="h-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <Button variant="outline" size="sm" onClick={() => {}}>
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <p className="w-[600px]">Loading users...</p>
            </div>
          ) : (
            <div className="w-full min-w-[640px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(filteredUsers?.length ?? 0) > 0 ? (
                    (filteredUsers ?? []).map((user: any) => (
                      <TableRow key={user.user_id}>
                        <TableCell className="font-medium">
                          {user.username}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone_number}</TableCell>
                        <TableCell className="capitalize">
                          {user.role}
                        </TableCell>
                        <TableCell>
                          <div
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              user.is_banned
                                ? "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                                : user.is_verified
                                ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                                : "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300"
                            }`}
                          >
                            {user.is_banned
                              ? "Banned"
                              : user.is_verified
                              ? "Verified"
                              : "Pending"}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {!user.is_banned && (
                              <AlertDialog
                                open={openDialogId === user.user_id}
                                onOpenChange={(isOpen) => {
                                  if (isOpen) {
                                    setOpenDialogId(user.user_id);
                                  } else {
                                    setOpenDialogId(null);
                                  }
                                }}
                              >
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-destructive"
                                  >
                                    <Ban className="h-4 w-4" />
                                    <span className="sr-only">Ban user</span>
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Ban User
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Bạn chắc chắn muốn BAN người dùng này?
                                      Người dùng bị BAN sẽ không thể truy cập
                                      trang web
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel disabled={isPending}>
                                      Hủy
                                    </AlertDialogCancel>
                                    <Button
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90 "
                                      onClick={() =>
                                        handleBanUser(user.user_id)
                                      }
                                      disabled={isPending}
                                    >
                                      {isPending ? "Đang xử lý..." : "Ban User"}
                                    </Button>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No users found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
