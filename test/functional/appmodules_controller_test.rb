require 'test_helper'

class AppmodulesControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:appmodules)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create appmodule" do
    assert_difference('Appmodule.count') do
      post :create, :appmodule => { }
    end

    assert_redirected_to appmodule_path(assigns(:appmodule))
  end

  test "should show appmodule" do
    get :show, :id => appmodules(:one).id
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => appmodules(:one).id
    assert_response :success
  end

  test "should update appmodule" do
    put :update, :id => appmodules(:one).id, :appmodule => { }
    assert_redirected_to appmodule_path(assigns(:appmodule))
  end

  test "should destroy appmodule" do
    assert_difference('Appmodule.count', -1) do
      delete :destroy, :id => appmodules(:one).id
    end

    assert_redirected_to appmodules_path
  end
end
