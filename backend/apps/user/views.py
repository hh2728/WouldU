from dataclasses import field
import json
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .models import User, Survey, User_kind_code

from django.db import connection

from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from django.shortcuts import get_object_or_404
from django.http.response import JsonResponse
from django.core import serializers


from apps.user.serializer import UserSerializer

# Create your views here.
# 회원가입 
@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    user = UserSerializer(data=request.data)
    reply_list= request.data['reply_list']

    if user.is_valid():

        user_k = cal_reply(reply_list).kind_code
        user.save()
    
        user_id = user['user_id'].value
        User.objects.filter(user_id = user_id).update(user_kind = user_k)
        kind_n = User_kind_code.objects.get(kind_code = user_k)
        kind = kind_n.kind_name

        id = User.objects.get(user_id = user_id) # user_no
        Survey.objects.create(user_no = id, reply_list = reply_list)
        return JsonResponse({'result' : "success", 'user_kind': [user_k, kind]})
    return JsonResponse({'result' : "fail"})
    #return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)

def cal_reply(reply_list):
    ey=0
    en=0
    oy=0
    on=0
    for index, val in enumerate(reply_list):
        print(index, val)
        # 짝수
        if((index+1)%2==0):
           if(val == 'Y'): 
                ey += 1
           else: 
                en +=1
        # 홀수
        else:
           if(val == 'Y'): 
                oy += 1
           else: 
                on +=1

    
    # if(oy>on):
    #     if(ey>en):
    #         user_k = User_kind_code.objects.get(kind_code = 'K1')
    #         # us.update(user_kind= user_k)
    #     else: 
    #         print("here")
    #         user_k = User_kind_code.objects.get(kind_code = 'K2')
    #         # us.update(user_kind =user_k)
    # else:
    #     if(ey>en):
    #         user_k = User_kind_code.objects.get(kind_code = 'K3')
    #         # us.update(user_kind=user_k)
    #     else:
    #         # us.update(user_kind=user_k)
    
    if(oy>on):
        if(ey>en):
            kind_code = 'K1'
        else: 
            kind_code = 'K2'
    else:
        if(ey>en):
            kind_code = 'K3'
        else:
            kind_code = 'K4'
    
    user_k = User_kind_code.objects.get(kind_code = kind_code)

    return user_k


# 아이디 중복검사 
@api_view(['GET'])
@permission_classes([AllowAny])
def checkid(request, id):
    try:
        id = User.objects.get(user_id = id)    
    except :
        id = None 
    if id is None :
        duplicate ="success"
    else : 
        duplicate = "fail"
    context= {'result' : duplicate}
    return JsonResponse(context)


# 로그인
@api_view(['POST'])
@permission_classes([AllowAny])
def signin(request):
    reqData=request.data
    user_id=reqData['user_id']
    password= reqData['password']
    print("id : ",user_id)
    row = serializers.serialize("json", User.objects.filter(user_id=user_id), fields = {"nickname", "password"})
    print(row)
    size= len(json.loads(row))
    if(size == 0):
        login ="fail"
        nick =None
        user_no=None
    else : 
        u_no = json.loads(row)[0]['pk']
        password_n = json.loads(row)[0]['fields']['password']
        nickname_n = json.loads(row)[0]['fields']['nickname']
        if(password != password_n):
            login = "fail"
            nick = None
            user_no=None
        else:
            login = "success"
            nick =nickname_n
            user_no=u_no
    context= {'result' : login ,
              'nickname' : nick,
              'user_no' : user_no }
    return JsonResponse(context)

    

    
